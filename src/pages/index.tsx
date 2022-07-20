import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
/** Components */
import Select from '@components/Select';
import Input from '@components/Input';
import Switch from '@components/Switch';
import Button from '@components/Button';
/** Constants */
import { sessionOptions } from '@constants/session';
import {
  LASTFM_METHODS,
  LASTFM_PERIODS,
  DEFAULT_LASTFM_METHOD,
  DEFAULT_LASTFM_PERIOD,
} from '@constants/lastfm';
/** Types */
import { User } from '@customTypes/auth';
/** Styles */
import styles from '@styles/pages/Configuration.module.scss';

interface IndexPageProps {
  user: User | null;
  sessionKey: string | undefined;
}

interface FormValues {
  method: string;
  width: string;
  height: string;
  period: string;
  shuffle: boolean;
  skipDuplicates: boolean;
  otherUser: boolean;
  username: string;
}

const Home: NextPage<IndexPageProps> = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      method: DEFAULT_LASTFM_METHOD,
      period: DEFAULT_LASTFM_PERIOD,
      shuffle: true,
      skipDuplicates: true,
    },
  });

  const isOtherUserSelected = watch('otherUser');

  const handleSubmitForm: SubmitHandler<FormValues> = (
    { shuffle, skipDuplicates, otherUser, username, ...data },
    event
  ) => {
    event?.preventDefault();

    if (errors && Object.keys(errors).length) return;

    const params = {
      ...data,
      ...(shuffle && { shuffle: '1' }),
      ...(skipDuplicates && { skipDuplicates: '1' }),
      ...(otherUser && { username }),
    };

    router.push(`/collage?${new URLSearchParams(params).toString()}`);
  };

  return (
    <>
      <Head>
        <title>Configuration | Last.fm Collage</title>
        <meta
          name="description"
          content="Last.fm Collage is an application that creates a collage with the cover art of your favourite music registered in your last.fm account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>Configuration</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className={styles.formGroupSingle}>
            <div className={styles.formField}>
              <h3 className={styles.formFieldTitle}>Collage type</h3>
              <Controller
                control={control}
                name="method"
                rules={{ required: 'This field is required.' }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    name="method"
                    options={LASTFM_METHODS}
                    value={value}
                    error={errors.method}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formFieldWrapper}>
              <h3 className={styles.formFieldTitle}>Dimensions</h3>
              <div className={styles.formFieldHorizontal}>
                <span className={styles.formFieldLabel}>Width</span>
                <Controller
                  control={control}
                  name="width"
                  rules={{ required: 'This field is required.' }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      name="width"
                      type="number"
                      min="0"
                      placeholder="Set a width"
                      autoComplete="off"
                      defaultValue={value}
                      error={errors.width}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className={styles.formFieldHorizontal}>
                <span className={styles.formFieldLabel}>Height</span>
                <Controller
                  control={control}
                  name="height"
                  rules={{ required: 'This field is required.' }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      name="height"
                      type="number"
                      min="0"
                      placeholder="Set a height"
                      autoComplete="off"
                      defaultValue={value}
                      error={errors.height}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.formFieldWrapper}>
              <h3 className={styles.formFieldTitle}>Period</h3>
              <Controller
                control={control}
                name="period"
                rules={{ required: 'This field is required.' }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    name="period"
                    options={LASTFM_PERIODS}
                    value={value}
                    error={errors.period}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className={`${styles.formField} ${styles.formFieldInline}`}>
            <Controller
              control={control}
              name="shuffle"
              render={({ field: { value, onChange } }) => (
                <Switch name="shuffle" value={value} onChange={onChange}>
                  Shuffle
                </Switch>
              )}
            />
            <Controller
              control={control}
              name="skipDuplicates"
              render={({ field: { value, onChange } }) => (
                <Switch name="skipDuplicates" value={value} onChange={onChange}>
                  Skip possible duplicates
                </Switch>
              )}
            />
          </div>
          <div className={styles.formFieldWrapper}>
            <div className={styles.formField}>
              <Controller
                control={control}
                name="otherUser"
                render={({ field: { value, onChange } }) => (
                  <Switch name="otherUser" value={value} onChange={onChange}>
                    Wanna get data from another user instead?
                  </Switch>
                )}
              />
            </div>
            {isOtherUserSelected && (
              <div className={styles.formGroupSingle}>
                <div className={styles.formField}>
                  <Controller
                    control={control}
                    name="username"
                    rules={{ required: 'This field is required.' }}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        name="username"
                        placeholder="Set a username"
                        autoComplete="off"
                        defaultValue={value}
                        error={errors.username}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.formFooter}>
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          h1 {
            color: #333;
            margin: 0;
          }
          form {
            width: 100%;
            max-width: 700px;
            display: flex;
            flex-direction: column;
            row-gap: 40px;
          }
        `}
      </style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({
    req,
  }): Promise<{
    redirect?: {
      permanent?: boolean;
      destination: string;
    };
    props: { user: User | null; sessionKey?: string | undefined };
  }> => {
    const { user, sessionKey } = req.session ?? {};
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/signin',
        },
        props: { user: null },
      };
    }
    return { props: { user, sessionKey } };
  },
  sessionOptions
);

export default Home;
