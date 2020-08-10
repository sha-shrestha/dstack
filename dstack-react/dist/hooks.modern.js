import { useRef, useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash-es';

var usePrevious = (value => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
});

var useOnClickOutside = ((ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
});

const isEmail = value => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};
const isRequired = value => {
  return !(value === null || value === undefined || value === '');
};
const noSpaces = value => {
  return /^[\S]*$/.test(value);
};
const isValidStackName = value => {
  return /^[^\/]/.test(value) && /^[a-zA-Z0-9\/_]+$/.test(value);
};

const validationMap = {
  required: isRequired,
  email: isEmail,
  'no-spaces-stack': noSpaces,
  'stack-name': isValidStackName
};

const getValidationFunction = validator => {
  if (typeof validator === 'string' && validationMap[validator]) return validationMap[validator];
  if (typeof validator === 'function') return validator;
  return () => true;
};

var useForm = ((initialFormState, fieldsValidators = {}) => {
  const [form, setForm] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const onChange = (eventOrName, value) => {
    let name;
    let fieldValue;

    if (eventOrName.target) {
      const event = eventOrName;
      fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      name = event.target.name;
    } else {
      name = eventOrName;
      fieldValue = value;
    }

    setForm({ ...form,
      [name]: fieldValue
    });
    setFormErrors({ ...formErrors,
      [name]: []
    });
  };

  const resetForm = () => {
    setForm(initialFormState);
    setFormErrors({});
  };

  const getFieldErrors = fieldName => {
    const errors = [];
    if (Array.isArray(fieldsValidators[fieldName])) fieldsValidators[fieldName].forEach(validator => {
      const isValid = getValidationFunction(validator);
      if (!isValid(form[fieldName])) errors.push(validator);
    });

    if (typeof fieldsValidators[fieldName] === 'string') {
      const isValid = getValidationFunction(fieldsValidators[fieldName]);
      if (!isValid(form[fieldName])) errors.push(fieldsValidators[fieldName]);
    }

    return errors;
  };

  const checkValidForm = () => {
    let isValid = true;
    const newFormErrors = {};
    Object.keys(fieldsValidators).forEach(fieldName => {
      const errors = getFieldErrors(fieldName);
      newFormErrors[fieldName] = errors;
      isValid = isValid && !errors.length;
    });
    setFormErrors(newFormErrors);
    return isValid;
  };

  return {
    form,
    setForm,
    formErrors,
    setFormErrors,
    resetForm,
    onChange,
    checkValidForm
  };
});

var useIntersectionObserver = ((callBack, {
  rootMargin: _rootMargin = '0px',
  threshold: _threshold = 0.01,
  root: _root = null
}, deps) => {
  const ref = useRef(null);
  const intersectionCallback = useCallback(([target]) => {
    if (target.isIntersecting) {
      callBack();
    }
  }, deps);
  useEffect(() => {
    const options = {
      root: _root,
      rootMargin: _rootMargin,
      threshold: _threshold
    };
    const observer = new IntersectionObserver(intersectionCallback, options);
    if (ref && ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, intersectionCallback]);
  return [ref];
});

var useDebounce = ((callback, depsOrDelay, deps) => {
  let delay = 300;
  if (typeof depsOrDelay === 'number') delay = depsOrDelay;else deps = depsOrDelay;
  return useCallback(debounce(callback, delay), deps);
});

const useTimeout = (callback, timeout = 0) => {
  const timeoutIdRef = useRef();
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;

    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);
  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
  }, [callback, timeout, cancel]);
  return cancel;
};

export { useDebounce, useForm, useIntersectionObserver, useOnClickOutside, usePrevious, useTimeout };
//# sourceMappingURL=hooks.modern.js.map
