import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
/** Components */
import Button from './Button';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  props?: any;
  onClick: any;
};

const onClickMock = jest.fn();

const renderButton = (props: Partial<ButtonProps> = {}) => {
  const defaultProps: ButtonProps = {
    children: <span>Button test</span>,
    className: 'externalClassName',
    onClick: onClickMock,
  };
  return render(<Button {...defaultProps} {...props} />);
};

describe('<Button>', () => {
  afterEach(() => {
    cleanup();
  });

  test('Snapshot renders => it should be rendered with the provided props', () => {
    const { container } = renderButton();
    expect(container).toMatchSnapshot();
  });

  test('should fire onClick event on click over the button', () => {
    const { getByRole } = renderButton();

    fireEvent.click(getByRole('button'));

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('should not have basic accessibility issues', async () => {
    const { container } = renderButton();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
