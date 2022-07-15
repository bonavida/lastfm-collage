import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
/** Hooks */
import useClickOutside from '@hooks/useClickOutside';
/** Types */
import { SelectOption } from '@customTypes/common';
/** Styles */
import styles from './Select.module.scss';

interface SelectProps {
  name: string;
  options: Array<SelectOption>;
  textProperty?: string;
  valueProperty?: string;
  value: string | number | boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: { message: string };
  onChange: (arg0: string | boolean) => void;
}

const SelectEmpty = ({ text }: { text: string }) => (
  <li className={styles.selectOption}>{text}</li>
);

const Select = ({
  name,
  options,
  textProperty = 'name',
  valueProperty = 'id',
  value = '',
  disabled = false,
  onChange,
  placeholder = 'Select an option',
  className = '',
  error,
}: SelectProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useClickOutside(wrapperRef, false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectWidth, setSelectWidth] = useState(0);

  useEffect(() => {
    if (triggerRef.current) {
      const triggerElementWidth = triggerRef.current.offsetWidth;
      setSelectWidth(triggerElementWidth);
    }
  }, [triggerRef]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsActive((isActiveState: boolean) => !isActiveState);
  };

  const handleOptionChange = (option: SelectOption) => {
    if (option.disabled) return;

    setIsActive((isActiveState) => !isActiveState);

    if (value === option[valueProperty]) return;

    setSelectedValue(option[valueProperty]);
    onChange && onChange(option[valueProperty]);
  };

  const renderSelectedOption = () => {
    // If there are no options or there isn't a selected value yet, display placeholder
    if (!options.length || !selectedValue)
      return <div className={styles.selectPlaceholder}>{placeholder}</div>;

    const selectedOption = options.find(
      (option) => option[valueProperty] === selectedValue
    );

    if (!selectedOption) return <div />;

    return (
      <div className={styles.selectValue}>{selectedOption[textProperty]}</div>
    );
  };

  const selectWrapperClasses = cx(styles.selectWrapper, {
    [className]: !!className,
  });

  const selectTriggerClasses = cx(styles.selectTrigger, {
    [styles.selectTriggerDisabled]: disabled,
    [styles.selectTriggerError]: !!error,
  });

  const selectCaretClasses = cx(styles.selectCaret, {
    [styles.selectCaretVisible]: isActive,
  });

  const selectOptionsClasses = cx(styles.selectOptionsWrapper, {
    [styles.selectOptionsWrapperActive]: isActive,
  });

  return (
    <div className={styles.select}>
      <div ref={wrapperRef} className={selectWrapperClasses}>
        <div
          ref={triggerRef}
          onClick={handleTriggerClick}
          className={selectTriggerClasses}
        >
          {renderSelectedOption()}
          <FontAwesomeIcon icon="angle-down" className={selectCaretClasses} />
        </div>
        <div
          ref={selectRef}
          className={selectOptionsClasses}
          style={selectWidth ? { width: `${selectWidth}px` } : undefined}
        >
          <ul className={styles.selectOptions}>
            {options.length ? (
              options.map((option) => {
                const selectOptionClasses = cx(styles.selectOption, {
                  [styles.selectOptionActive]:
                    option[valueProperty] === selectedValue,
                  [styles.selectOptionDisabled]: !!option.disabled,
                });
                return (
                  <li
                    key={`${name}_option_${option[valueProperty]}`}
                    className={selectOptionClasses}
                    onClick={() => handleOptionChange(option)}
                  >
                    {option[textProperty]}
                  </li>
                );
              })
            ) : (
              <SelectEmpty text="No data found." />
            )}
          </ul>
        </div>
      </div>
      {error && error.message && (
        <span className={styles.selectErrorMessage}>{error.message}</span>
      )}
    </div>
  );
};

export default Select;
