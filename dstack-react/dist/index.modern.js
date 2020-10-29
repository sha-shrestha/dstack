import React__default, { createContext, useReducer, useContext, forwardRef, useState, useRef, useEffect, useImperativeHandle, useMemo, memo, useCallback, Fragment, Component } from 'react';
import axios from 'axios';
import { get, isEqual, isString, debounce, unionBy } from 'lodash-es';
import cx from 'classnames';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import RcTooltip from 'rc-tooltip';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import { Portal } from 'react-portal';
import Select, { Option, OptGroup } from 'rc-select';
import Slider from 'rc-slider';
import Plot from 'react-plotly.js';
import { parse } from 'csv-string';
import { Link, Switch, Route } from 'react-router-dom';
import { v4 } from 'uuid';
import useSWR from 'swr';
import { useParams, useHistory } from 'react-router';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/themes/prism.css';
import { usePrevious as usePrevious$1 } from 'react-use';
import { useDrag, useDrop } from 'react-dnd';
export { DndProvider } from 'react-dnd';

var actionsTypes = {
  FETCH_CURRENT_USER: 'app/user/FETCH',
  FETCH_CURRENT_USER_SUCCESS: 'app/user/FETCH_SUCCESS',
  FETCH_CURRENT_USER_FAIL: 'app/user/FETCH_FAIL',
  START_PROGRESS: 'app/START_PROGRESS',
  SET_PROGRESS: 'app/SET_PROGRESS',
  COMPLETE_PROGRESS: 'app/COMPLETE_PROGRESS',
  RESET_PROGRESS: 'app/RESET_PROGRESS'
};

const initialState = {
  currentUser: {
    loading: false,
    data: null
  },
  appProgress: {
    active: null,
    value: null
  }
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_CURRENT_USER:
      return { ...state,
        currentUser: { ...state.currentUser,
          loading: true
        }
      };

    case actionsTypes.FETCH_CURRENT_USER_SUCCESS:
      return { ...state,
        currentUser: { ...state.currentUser,
          data: action.payload,
          loading: false
        }
      };

    case actionsTypes.FETCH_FAIL:
      return { ...state,
        currentUser: { ...state.currentUser,
          loading: false
        }
      };

    case actionsTypes.START_PROGRESS:
      return { ...state,
        appProgress: { ...state.appProgress,
          active: true,
          value: null
        }
      };

    case actionsTypes.SET_PROGRESS:
      return { ...state,
        appProgress: { ...state.appProgress,
          value: action.payload
        }
      };

    case actionsTypes.COMPLETE_PROGRESS:
      return { ...state,
        appProgress: { ...state.appProgress,
          active: false,
          value: null
        }
      };

    case actionsTypes.RESET_PROGRESS:
      return { ...state,
        appProgress: { ...state.appProgress,
          active: null,
          value: null
        }
      };

    default:
      return state;
  }
};
const StateContext = createContext();
const AppStoreProvider = ({
  children,
  apiUrl
}) => /*#__PURE__*/React__default.createElement(StateContext.Provider, {
  value: useReducer(reducer, { ...initialState,
    apiUrl
  })
}, children);
const useAppStore = () => useContext(StateContext);

var config = {
  DOCS_URL: 'http://docs.dstack.ai',
  LOGIN_URL: '/users/login',
  VERIFY_EMAIL_URL: '/users/verify',
  SUPPORT_URL: '/support/submit',
  SIGN_UP_URL: '/users/register',
  RESET_PASSWORD_URL: '/users/reset',
  UPDATE_PASSWORD_URL: '/users/update/password',
  USER_DATA_URL: '/users/remember',
  UPDATE_TOKEN_URL: '/users/update/token',
  UPDATE_SETTINGS_URL: '/users/update/settings',
  CHECK_USER: userName => `/users/exists/${userName}`,
  STACKS_LIST: userName => `/stacks/${userName}`,
  DELETE_STACK: () => '/stacks/delete',
  STACK_DETAILS: (userName, stack) => `/stacks/${userName}/${stack}`,
  STACK_FRAME: (userName, stack, frameId) => `/frames/${userName}/${stack}/${frameId}`,
  STACK_ATTACHMENT: (stack, frameId, id) => `/attachs/${stack}/${frameId}/${id}`,
  STACK_UPDATE: '/stacks/update',
  STACK_PUSH: '/stacks/push',
  DASHBOARD_LIST: userName => `/dashboards/${userName}`,
  DASHBOARD_DETAILS: (userName, id) => `/dashboards/${userName}/${id}`,
  DASHBOARD_CREATE: '/dashboards/create',
  DASHBOARD_UPDATE: '/dashboards/update',
  DASHBOARD_DELETE: '/dashboards/delete',
  DASHBOARD_CARDS_INSERT: '/dashboards/cards/insert',
  DASHBOARD_CARDS_UPDATE: '/dashboards/cards/update',
  DASHBOARD_CARDS_DELETE: '/dashboards/cards/delete',
  JOB_LIST: userName => `/jobs/${userName}`,
  JOB_DETAILS: (userName, id) => `/jobs/${userName}/${id}`,
  JOB_CREATE: '/jobs/create',
  JOB_UPDATE: '/jobs/update',
  JOB_DELETE: '/jobs/delete',
  JOB_RUN: '/jobs/run',
  JOB_STOP: '/jobs/stop',
  DISCORD_URL: 'https://discord.gg/8xfhEYa',
  TWITTER_URL: 'https://twitter.com/dstackai',
  GITHUB_URL: 'https://github.com/dstackai',
  BLOG_URL: 'https://blog.dstack.ai',
  TOKEN_STORAGE_KEY: 'token'
};
const reportPlotPythonCode = `import matplotlib.pyplot as plt
import dstack as ds

fig = plt.figure()
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])

ds.push_frame("simple", fig, "My first plot")`;
const installRPackageCode = 'install.packages("dstack")';
const reportPlotRCode = `library(ggplot2)
library(dstack)

df <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))
image <- ggplot(data = df, aes(x = x, y = y)) + geom_line()

push_frame("simple", image, "My first plot")`;

const apiFabric = ({
  apiUrl
} = {}) => {
  const CancelToken = axios.CancelToken;
  const instance = axios.create({
    baseURL: apiUrl,
    crossDomain: true
  });
  instance.cancelToken = CancelToken;
  instance.interceptors.request.use(requestConfig => {
    const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
    requestConfig.headers.Authorization = token ? `Bearer ${token}` : '';
    return requestConfig;
  });
  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    if (get(error, 'response.status', null) === 401) {
      return Promise.reject(error.response);
    } else if (get(error, 'response.status', null) === 400) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  });
  return instance;
};

var image = "lock~ZBorChcU.svg";

var css = {"forbidden":"_style-module__forbidden__3PN84","message":"_style-module__message__2i8KH"};

const AccessForbidden = ({
  children
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css.forbidden
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image,
    alt: "",
    width: "85",
    height: "104"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css.message
  }, children));
};

var css$1 = {"avatar":"_styles-module__avatar__3xvkT"};

const Avatar = forwardRef(({
  className,
  name,
  color: _color = 'violet',
  size: _size = 'normal',
  withBorder,
  onClick
}, ref) => {
  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$1.avatar, className, _color, _size, {
      border: withBorder
    }),
    onClick: onClick
  }, name.slice(0, 2));
});

var css$2 = {"back":"_styles-module__back__1MuhU"};

const BackButton = ({
  Component: _Component = 'button',
  children,
  className,
  ...props
}) => {
  return /*#__PURE__*/React__default.createElement(_Component, Object.assign({
    className: cx(css$2.back, className)
  }, props), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-arrow-left"
  }), children);
};

var css$3 = {"button":"_style-module__button__2lKoS","spinner":"_style-module__spinner__31PPt"};

var css$4 = {"spinner":"_styles-module__spinner__3XhrC","spinner-animation":"_styles-module__spinner-animation__2UA3s"};

const COLORS = {
  white: '#fff',
  blue: '#507CD0'
};

const Spinner = ({
  size: _size = 22,
  color: _color = 'white',
  isShown,
  className,
  align
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$4.spinner, className, align, {
      show: isShown
    })
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: _size,
    height: _size,
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M11.7046 18.9689C13.3618 18.8224 14.9321 18.1628 16.1969 17.0821C17.4617 16.0014 18.3581 14.5532 18.7614 12.9392C19.1647 11.3252 19.0548 9.62557 18.4469 8.07695C17.839 6.52832 16.7635 5.20773 15.37 4.29897C13.9765 3.39021 12.3343 2.9385 10.672 3.00671C9.00979 3.07491 7.41015 3.65964 6.09577 4.67951C4.78139 5.69938 3.81766 7.10365 3.33871 8.69687C2.85976 10.2901 2.88943 11.993 3.42358 13.5686L5.19569 12.9678C4.78648 11.7607 4.76375 10.4561 5.13067 9.23556C5.4976 8.01499 6.23591 6.93918 7.24286 6.15785C8.24981 5.37653 9.4753 4.92857 10.7488 4.87632C12.0222 4.82406 13.2803 5.17012 14.3478 5.86632C15.4154 6.56253 16.2394 7.57423 16.7051 8.76064C17.1708 9.94704 17.255 11.2491 16.946 12.4856C16.6371 13.7221 15.9503 14.8316 14.9814 15.6595C14.0124 16.4875 12.8094 16.9927 11.5398 17.105L11.7046 18.9689Z",
    fill: "url(#paint0_linear)"
  }), /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("linearGradient", {
    id: "paint0_linear",
    x1: "13.5",
    y1: "18",
    x2: "4",
    y2: "13",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__default.createElement("stop", {
    stopColor: COLORS[_color]
  }), /*#__PURE__*/React__default.createElement("stop", {
    offset: "1",
    stopColor: COLORS[_color],
    stopOpacity: "0.2"
  })))));
};

const Button = forwardRef(({
  Component: _Component = 'button',
  children,
  className,
  size: _size = 'normal',
  color: _color = 'default',
  variant: _variant = 'default',
  fullWidth: _fullWidth = false,
  isShowSpinner,
  ...props
}, ref) => {
  return /*#__PURE__*/React__default.createElement(_Component, Object.assign({
    ref: ref,
    className: cx(css$3.button, _size, `color-${_color}`, `variant-${_variant}`, className, {
      'full-width': _fullWidth
    })
  }, props), isShowSpinner && /*#__PURE__*/React__default.createElement(Spinner, {
    className: css$3.spinner,
    color: "white",
    isShown: true
  }), children);
});

var css$5 = {"checkbox":"_styles-module__checkbox__3lqFk","toggle-label":"_styles-module__toggle-label__1aLAG","label":"_styles-module__label__2PZb-","wrapper":"_styles-module__wrapper__2Vufp","mark":"_styles-module__mark__2Pb2f"};

const CheckboxField = ({
  className,
  value,
  disabled,
  appearance: _appearance = 'checkbox',
  align: _align = 'left',
  label,
  onLabel,
  offLabel,
  children,
  ...props
}) => {
  return /*#__PURE__*/React__default.createElement("label", {
    className: cx(css$5.checkbox, className, _appearance, _align, {
      disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("input", Object.assign({
    type: "checkbox",
    checked: value
  }, props)), offLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5['toggle-label'], 'off'),
    dangerouslySetInnerHTML: {
      __html: offLabel
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$5.wrapper
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$5.mark, 'mdi', 'mdi-check', {
      'toggle-color': !(onLabel && offLabel)
    })
  })), onLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5['toggle-label'], 'on'),
    dangerouslySetInnerHTML: {
      __html: onLabel
    }
  }), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$5.label
  }, label)), children);
};

var css$6 = {"copy":"_styles-module__copy__3J5hd","message":"_styles-module__message__3RWnQ","button":"_styles-module__button__2YqEb","icon":"_styles-module__icon__25GMO"};

const Copy = ({
  children,
  className,
  copyText,
  successMessage,
  buttonTitle
}) => {
  const {
    t
  } = useTranslation();
  const [isShowMessage, setIsShowMessage] = useState(false);

  const onCLick = () => {
    copy(copyText);
    setIsShowMessage(true);
    setTimeout(() => setIsShowMessage(false), 3000);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$6.copy, className)
  }, children ? children({
    onClick: onCLick
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$6.button,
    onClick: onCLick
  }, /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$6.icon, 'mdi mdi-content-copy')
  }), buttonTitle ? buttonTitle : t('copy')), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$6.message, {
      'is-show': isShowMessage
    })
  }, successMessage ? successMessage : t('copied')));
};

var css$7 = {"code":"_styles-module__code__3gARj","copy":"_styles-module__copy__m44gX","icon":"_styles-module__icon__ZmZbg"};

const CodeViewer = ({
  className,
  language,
  children,
  fontSize
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$7.code, className, fontSize && `font-size-${fontSize}`)
  }, /*#__PURE__*/React__default.createElement(Highlight, {
    language: language
  }, children), /*#__PURE__*/React__default.createElement(Copy, {
    className: css$7.copy,
    copyText: children,
    successMessage: t('snippetIsCopied')
  }));
};

var css$8 = {"dropdown":"_styles-module__dropdown__1qRCw","button":"_styles-module__button__fzNEm","menu":"_styles-module__menu__AJ1Y3","item":"_styles-module__item__3lbfY"};

const Dropdown = ({
  className,
  buttonClassName,
  children,
  items
}) => {
  const [isShow, setIsShow] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    document.body.addEventListener('click', outlineClickHandle);
    return () => document.body.removeEventListener('click', outlineClickHandle);
  });

  const outlineClickHandle = event => {
    let targetElement = event.target;

    do {
      if (targetElement === buttonRef.current || targetElement === dropdownRef.current) return;
      targetElement = targetElement.parentNode;
    } while (targetElement);

    if (isShow) setIsShow(false);
  };

  const onCLickButton = event => {
    clickStopPropagation(event);
    setIsShow(!isShow);
  };

  const clickStopPropagation = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onCLickItem = item => () => {
    setIsShow(!isShow);
    if (item.onClick) item.onClick();
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$8.dropdown, className, {
      active: isShow
    })
  }, /*#__PURE__*/React__default.createElement(RcTooltip, {
    arrowContent: null,
    visible: isShow,
    placement: "bottomRight",
    destroyTooltipOnHide: true,
    align: {
      offset: [0, 0]
    },
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: cx(css$8.menu, 'show'),
      ref: dropdownRef,
      onClick: clickStopPropagation
    }, items.map((i, index) => /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: css$8.item,
      onClick: onCLickItem(i)
    }, i.title)))
  }, children ? React__default.cloneElement(children, {
    onClick: onCLickButton,
    ref: buttonRef
  }) : /*#__PURE__*/React__default.createElement("div", {
    ref: buttonRef,
    className: cx(css$8.button, buttonClassName),
    onClick: onCLickButton
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-vertical"
  }))));
};

const unicodeBase64Decode = text => {
  try {
    const decodeData = window.atob(text);
    return decodeURIComponent(Array.prototype.map.call(decodeData, c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    return null;
  }
};

const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes';
  let k = 1024;
  let dm = decimals <= 0 ? 0 : decimals || 2;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

var parseStackParams = ((attachments, tab) => {
  const fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(i => {
    Object.keys(i.params).forEach(key => {
      var _i$params$tab$value, _i$params$tab$key;

      if (tab && ((_i$params$tab$value = i.params[tab.value]) === null || _i$params$tab$value === void 0 ? void 0 : _i$params$tab$value.type) !== 'tab' && ((_i$params$tab$key = i.params[tab.key]) === null || _i$params$tab$key === void 0 ? void 0 : _i$params$tab$key.title) !== tab.value) return;
      if (i.params[key] instanceof Object) return;
      if (fields[key]) fields[key].options.push(i.params[key]);else fields[key] = {
        options: [i.params[key]]
      };
    });
  });
  Object.keys(fields).forEach(key => {
    if (typeof fields[key].options[0] === 'string') {
      fields[key].type = 'select';
      fields[key].options = fields[key].options.filter((a, b) => fields[key].options.indexOf(a) === b).map(i => ({
        label: i,
        value: i
      }));
    }

    if (typeof fields[key].options[0] === 'boolean') {
      fields[key].type = 'checkbox';
    }

    if (typeof fields[key].options[0] === 'number') {
      const options = fields[key].options;
      fields[key].type = 'slider';
      fields[key].min = Math.min.apply(null, options);
      fields[key].max = Math.max.apply(null, options);
      fields[key].options = {};
      options.filter((a, b) => options.indexOf(a) === b).forEach(i => fields[key].options[i] = i);
    }
  });
  return fields;
});

var parseStackTabs = (attachments => {
  const tabs = [];
  if (!attachments || !attachments.length) return;
  attachments.forEach(i => {
    Object.keys(i.params).forEach(key => {
      if (i.params[key] instanceof Object && i.params[key].type === 'tab') {
        const tab = i.params[key].title || key;
        if (!tabs.find(i => i.value === tab)) tabs.push({
          label: tab,
          value: tab,
          key
        });
      }
    });
  });
  return tabs;
});

var getFormattedDuration = (duration => {
  if (duration < 1000) return '0sec';
  let string = '';
  const momentDuration = moment.duration(duration);
  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();
  const seconds = momentDuration.seconds();
  if (hours) string += `${moment.duration(hours, 'hours').as('hours')}h`;
  if (minutes) string += ` ${moment.duration(minutes, 'minutes').as('minutes')}min`;
  if (seconds) string += ` ${moment.duration(seconds, 'seconds').asSeconds()}sec`;
  return string;
});

const fileToBase64 = async file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result.split(',')[1]);

  reader.onerror = error => reject(error);
});

const fetcher = async (url, responseDataFormat = data => data) => {
  const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);

  try {
    const request = await axios({
      url: url,
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
    return responseDataFormat(request.data);
  } catch (e) {
    let errorBody = null;
    let status = null;

    try {
      errorBody = JSON.parse(get(e, 'request.response'));
    } catch (e) {
      console.log(e);
    }

    try {
      status = get(e, 'request.status');
    } catch (e) {
      console.log(e);
    }

    const error = new Error('An error occurred while fetching the data.');
    error.info = errorBody;
    error.status = status;
    throw error;
  }
};

const isSignedIn = () => {
  const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
  return Boolean(token && token.length);
};

var css$9 = {"dnd":"_style-module__dnd__3uYii","fileWrapper":"_style-module__fileWrapper__1GUx_","file":"_style-module__file__2LG6L","fileExtend":"_style-module__fileExtend__3w6--","fileSection":"_style-module__fileSection__B8y5t","fileName":"_style-module__fileName__3Juxo","fileSize":"_style-module__fileSize__3G6N8","fileRemove":"_style-module__fileRemove__16dzP","placeholder":"_style-module__placeholder__Wr_Zp","button":"_style-module__button__14ku1","loading":"_style-module__loading__2KndP","progressBar":"_style-module__progressBar__DHbC1","progress":"_style-module__progress__2-dth","animate-stripes":"_style-module__animate-stripes__1Iecq"};

const FileDragnDrop = ({
  formats,
  className,
  loading,
  progressPercent: _progressPercent = null,
  onChange
}, ref) => {
  const {
    t
  } = useTranslation();
  const inputRef = useRef(null);
  const [active, setActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const isDidMount = useRef(true);
  useImperativeHandle(ref, () => ({
    clear: () => removeFile()
  }));
  useEffect(() => {
    if (!isDidMount.current) {
      if (onChange) onChange(selectedFile);
    } else isDidMount.current = false;
  }, [selectedFile]);

  const onClick = event => {
    event.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };

  const preventStop = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop = event => {
    preventStop(event);
    setActive(false);
    const [file] = event.dataTransfer.files;
    if (file && checkAvailableExtension(file)) setSelectedFile(file);
  };

  const onDragEnter = event => {
    preventStop(event);
    setActive(true);
  };

  const onDragLeave = event => {
    preventStop(event);
    setActive(false);
  };

  const onChangeInput = event => {
    const [file] = event.target.files;
    if (file && checkAvailableExtension(file)) setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const checkAvailableExtension = file => {
    const ext = '.' + file.name.split('.').pop();
    let isAvailable;
    if (formats && formats.length) isAvailable = formats.some(format => {
      if (format === '.jpg' || format === '.jpeg') return ext === '.jpg' || ext === '.jpeg';else return format === ext;
    });else isAvailable = true;
    return isAvailable;
  };

  if (loading) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.dnd, className, {
      active
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.loading
  }, t('Uploading'), "\u2026", typeof _progressPercent === 'number' && `${_progressPercent}%`), typeof _progressPercent === 'number' && /*#__PURE__*/React__default.createElement("div", {
    className: css$9.progressBar
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.progress,
    style: {
      width: `${_progressPercent}%`
    }
  })));
  if (selectedFile) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.fileWrapper, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.file
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileExtend
  }, selectedFile.name.split('.').pop()), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSection
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileName
  }, selectedFile.name), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSize
  }, formatBytes(selectedFile.size))), /*#__PURE__*/React__default.createElement("div", {
    onClick: removeFile,
    className: cx(css$9.fileRemove, 'mdi mdi-close')
  })));
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.dnd, className, {
      active
    }),
    onDrop: onDrop,
    onDragEnter: onDragEnter,
    onDragOver: onDragEnter,
    onDragLeave: onDragLeave
  }, /*#__PURE__*/React__default.createElement("input", {
    ref: inputRef,
    onChange: onChangeInput,
    type: "file"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.placeholder
  }, t('dragHereAFile'), '', Boolean(formats) && `(${formats.join(', ')})`, ' ', t('or'), ' '), /*#__PURE__*/React__default.createElement(Button, {
    className: css$9.button,
    variant: "contained",
    color: "primary",
    size: "small",
    onClick: onClick
  }, t('chooseAFile')));
};

var FileDragnDrop$1 = forwardRef(FileDragnDrop);

var css$a = {"loader":"_styles-module__loader__18_Ho","text":"_styles-module__text__3dZu_","stacks-pulse":"_styles-module__stacks-pulse__350eA","grid":"_styles-module__grid__Uki0v","item":"_styles-module__item__MvjKB","pic":"_styles-module__pic__Pc6fT","section":"_styles-module__section__2EIKh"};

const Loader = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$a.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  }))));
};

const MarkdownRender = props => {
  const newProps = { ...props,
    plugins: [RemarkMathPlugin],
    renderers: { ...props.renderers,
      math: props => /*#__PURE__*/React__default.createElement(MathJax.Node, {
        formula: props.value
      }),
      inlineMath: props => /*#__PURE__*/React__default.createElement(MathJax.Node, {
        inline: true,
        formula: props.value
      })
    }
  };
  return /*#__PURE__*/React__default.createElement(MathJax.Provider, {
    input: "tex"
  }, /*#__PURE__*/React__default.createElement(ReactMarkdown, newProps));
};

var css$b = {"modal":"_styles-module__modal__3FQ59","dialog":"_styles-module__dialog__268e0","close":"_styles-module__close__1Y7yz","title":"_styles-module__title__knxNI"};

const Modal = ({
  title,
  className,
  dialogClassName,
  size: _size = 'big',
  onClose,
  isShow,
  children,
  withCloseButton
}) => {
  const onClickByLayer = event => {
    if (event.currentTarget === event.target && onClose) onClose();
  };

  return /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$b.modal, className, {
      show: isShow
    }),
    onClick: onClickByLayer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$b.dialog, _size, dialogClassName)
  }, withCloseButton && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$b.close, 'mdi mdi-close'),
    onClick: onClose
  }), title && /*#__PURE__*/React__default.createElement("div", {
    className: css$b.title
  }, title), children)));
};

var image$1 = "404~FXFqzVOe.svg";

var css$c = {"not-found":"_style-module__not-found__tAZyq","message":"_style-module__message__3Ok1U","help":"_style-module__help__Aa8x8"};

const NotFound = ({
  children
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$c['not-found']
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image$1,
    alt: "",
    width: "224",
    height: "77"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css$c.message
  }, children), /*#__PURE__*/React__default.createElement("div", {
    className: css$c.help
  }, t('needHelpWWriteToUsOn'), ' ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.TWITTER_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-twitter"
  }), " Twitter"), ', ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.GITHUB_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-github-circle"
  }), "GitHub"), ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.DISCORD_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-discord"
  }), "Discord")));
};

var usePrevious = (value => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
});

var css$d = {"bar":"_styles-module__bar__12oWc","progress":"_styles-module__progress__3JWjz"};

const ProgressBar = ({
  className,
  isActive,
  progress: globalProgress
}) => {
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState(1000);
  const prevIsActive = usePrevious(isActive);
  const step = useRef(0.01);
  const currentProgress = useRef(0);
  const requestFrame = useRef(null);
  const isActiveRef = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    isActiveRef.current = isActive;

    if (isActive) {
      setProgress(0);
      step.current = 0.01;
      currentProgress.current = 0;
      startCalculateProgress();
    }

    if (prevIsActive === true && isActive === false) {
      setProgress(100);
      setTimeout(() => setProgress(0), 800);
    }

    if (isActive === null) {
      setProgress(0);
    }

    if (!isActive && requestFrame.current) {
      cancelAnimationFrame(requestFrame.current);
    }
  }, [isActive]);
  useEffect(() => {
    if (globalProgress !== null) setProgress(globalProgress);else {
      setProgress(0);
    }
  }, [globalProgress]);
  useEffect(() => {
    window.addEventListener('resize', onResize);
    if (ref.current) setWidth(ref.current.offsetWidth);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const calculateProgress = () => {
    currentProgress.current += step.current;
    const progress = Math.round(Math.atan(currentProgress.current) / (Math.PI / 2) * 100 * 1000) / 1000;
    setProgress(progress);
    if (progress > 70) step.current = 0.005;
    if (progress >= 100 || !isActiveRef.current) cancelAnimationFrame(requestFrame.current);
    if (isActiveRef.current) requestFrame.current = requestAnimationFrame(calculateProgress);
  };

  const startCalculateProgress = () => {
    requestAnimationFrame(calculateProgress);
  };

  const onResize = () => {
    if (ref.current) setWidth(ref.current.offsetWidth);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$d.bar, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$d.progress,
    style: {
      width: `${progress}%`,
      backgroundSize: `${width}px 5px`
    }
  }));
};

var css$e = {"field":"_styles-module__field__3WCaE","input":"_styles-module__input__9Tk5W","label":"_styles-module__label__1mHtq","error":"_styles-module__error__3jOrk"};

const TextField = ({
  label,
  className,
  size: _size = 'normal',
  errors: _errors = [],
  ...props
}) => {
  const hasErrors = Boolean(_errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$e.field, className, _size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$e.input
  }, /*#__PURE__*/React__default.createElement("input", Object.assign({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.error
  }, _errors.join(', '))));
};

var css$f = {"search":"_styles-module__search__3s1gr","field":"_styles-module__field__17rsB","clear":"_styles-module__clear__3oKZ5","button":"_styles-module__button__3BfRl"};

const SearchField = ({
  className,
  showEverything,
  isDark,
  ...props
}) => {
  const [isShow, setIsShow] = useState(showEverything || props.value && props.value.length);

  const clear = () => {
    if (props.onChange) props.onChange('');
    if (!showEverything) setIsShow(false);
  };

  const onChangeHandle = event => {
    if (props.onChange) props.onChange(event.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$f.search, className, {
      'is-dark': isDark
    })
  }, isShow && /*#__PURE__*/React__default.createElement(TextField, Object.assign({}, props, {
    onChange: onChangeHandle,
    className: css$f.field
  })), isShow && Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.clear,
    onClick: clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close"
  })), isShow && !Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })), !isShow && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.button,
    onClick: () => setIsShow(true)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })));
};

var css$g = {"field":"_styles-module__field__2jF9E","label":"_styles-module__label__iehEi","rcSelectLoadingIcon":"_styles-module__rcSelectLoadingIcon__VtsrG","rcSelectDropdownSlideUpIn":"_styles-module__rcSelectDropdownSlideUpIn__27wr-","rcSelectDropdownSlideUpOut":"_styles-module__rcSelectDropdownSlideUpOut__1QVN6","rcSelectDropdownSlideDownIn":"_styles-module__rcSelectDropdownSlideDownIn__1vYLX","rcSelectDropdownSlideDownOut":"_styles-module__rcSelectDropdownSlideDownOut__1-lNh","select-field":"_styles-module__select-field__1mUh_","select-field-selector":"_styles-module__select-field-selector__V9Ufm","select-field-arrow":"_styles-module__select-field-arrow__c4k8s","mdi":"_styles-module__mdi__2hNDK","select-field-selection-placeholder":"_styles-module__select-field-selection-placeholder__2Vdv0","select-field-selection-search":"_styles-module__select-field-selection-search__3GdNa","select-field-selection-search-input":"_styles-module__select-field-selection-search-input__3BOaB","select-field-selection-item":"_styles-module__select-field-selection-item__2uDu7","select-field-item-option-checkbox":"_styles-module__select-field-item-option-checkbox__2K_G1","select-field-selection-item-remove":"_styles-module__select-field-selection-item-remove__1k1IW","select-field-show-search":"_styles-module__select-field-show-search__3EVnU","select-field-show-arrow":"_styles-module__select-field-show-arrow__1xlmm","select-field-open":"_styles-module__select-field-open___jEZ1","select-field-multiple":"_styles-module__select-field-multiple__2YFSs","select-field-single":"_styles-module__select-field-single__1n3qF","select-field-clear":"_styles-module__select-field-clear__Mg5xq","select-field-item-option-state":"_styles-module__select-field-item-option-state__2yGkG","select-field-selection__choice-zoom":"_styles-module__select-field-selection__choice-zoom__3NUb5","select-field-selection__choice-zoom-appear":"_styles-module__select-field-selection__choice-zoom-appear__ZO73y","select-field-selection__choice-zoom-leave":"_styles-module__select-field-selection__choice-zoom-leave__2i54q","select-field-dropdown":"_styles-module__select-field-dropdown__14ngc"};

const allValue = 'all';

const SelectField = ({
  align: _align = 'left',
  label,
  disabled,
  placeholder,
  value: propValue = [],
  className,
  mode,
  onChange,
  options: _options = [],
  showSearch: _showSearch = true,
  ...props
}) => {
  const onChangeHandle = value => {
    if (value.indexOf(allValue) >= 0) if (value.length > _options.length) value = [];else value = _options.map(o => o.value);
    if (onChange) onChange(value);
  };

  const onSelect = () => {};

  const onDeselect = () => {};

  const renderOptions = () => _options.map(({
    value,
    label
  }) => /*#__PURE__*/React__default.createElement(Option, {
    key: value,
    value: value
  }, mode === 'multiple' && /*#__PURE__*/React__default.createElement(CheckboxField, {
    readOnly: true,
    className: "select-field-item-option-checkbox",
    value: propValue.indexOf(value) >= 0
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "select-field-item-option-label"
  }, label)));

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$g.field, className, _align, {
      disabled
    })
  }, /*#__PURE__*/React__default.createElement(Select, Object.assign({
    value: propValue,
    prefixCls: "select-field",
    multiple: mode === 'multiple',
    showArrow: true,
    showSearch: _showSearch,
    onSelect: onSelect,
    onDeselect: onDeselect,
    placeholder: placeholder,
    onChange: onChangeHandle,
    inputIcon: /*#__PURE__*/React__default.createElement("span", {
      className: "mdi mdi-chevron-down"
    })
  }, props), _options.length && mode === 'multiple' && /*#__PURE__*/React__default.createElement(Option, {
    key: allValue,
    value: allValue
  }, /*#__PURE__*/React__default.createElement(CheckboxField, {
    readOnly: true,
    className: "select-field-item-option-checkbox",
    value: propValue.length === _options.length
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "select-field-item-option-label"
  }, "Select all")), mode === 'multiple' ? /*#__PURE__*/React__default.createElement(OptGroup, null, renderOptions()) : renderOptions()), label && /*#__PURE__*/React__default.createElement("label", {
    className: css$g.label
  }, label));
};

var css$h = {"field":"_styles-module__field__2_NXc","rcSliderTooltipZoomDownIn":"_styles-module__rcSliderTooltipZoomDownIn__2jvao","rcSliderTooltipZoomDownOut":"_styles-module__rcSliderTooltipZoomDownOut__2HgMB","slider":"_styles-module__slider__31Ylv","label":"_styles-module__label__Zo_r8","rc-slider":"_styles-module__rc-slider__1hLjI","rc-slider-rail":"_styles-module__rc-slider-rail__v9bxI","rc-slider-track":"_styles-module__rc-slider-track___3emJ","rc-slider-handle":"_styles-module__rc-slider-handle__12sQ3","rc-slider-handle-dragging":"_styles-module__rc-slider-handle-dragging__2u63-","rc-slider-handle-click-focused":"_styles-module__rc-slider-handle-click-focused__7xSSR","rc-slider-mark":"_styles-module__rc-slider-mark__1l2Qm","rc-slider-mark-text":"_styles-module__rc-slider-mark-text__2zf2c","rc-slider-mark-text-active":"_styles-module__rc-slider-mark-text-active__25tuh","rc-slider-step":"_styles-module__rc-slider-step__3wC_L","rc-slider-dot":"_styles-module__rc-slider-dot__17-SM","rc-slider-dot-active":"_styles-module__rc-slider-dot-active__1eLwY","rc-slider-dot-reverse":"_styles-module__rc-slider-dot-reverse__Ewb1d","rc-slider-disabled":"_styles-module__rc-slider-disabled__1YO43","rc-slider-vertical":"_styles-module__rc-slider-vertical__12Juq","rc-slider-tooltip-zoom-down-enter":"_styles-module__rc-slider-tooltip-zoom-down-enter__2a95b","rc-slider-tooltip-zoom-down-appear":"_styles-module__rc-slider-tooltip-zoom-down-appear__2wvsD","rc-slider-tooltip-zoom-down-leave":"_styles-module__rc-slider-tooltip-zoom-down-leave__3jMC3","rc-slider-tooltip-zoom-down-enter-active":"_styles-module__rc-slider-tooltip-zoom-down-enter-active__1M8Be","rc-slider-tooltip-zoom-down-appear-active":"_styles-module__rc-slider-tooltip-zoom-down-appear-active__3tu2z","rc-slider-tooltip-zoom-down-leave-active":"_styles-module__rc-slider-tooltip-zoom-down-leave-active__P9_lk","rc-slider-tooltip":"_styles-module__rc-slider-tooltip__1PZK2","rc-slider-tooltip-hidden":"_styles-module__rc-slider-tooltip-hidden__2CvyB","rc-slider-tooltip-placement-top":"_styles-module__rc-slider-tooltip-placement-top__qzmlA","rc-slider-tooltip-inner":"_styles-module__rc-slider-tooltip-inner__27Bp4","rc-slider-tooltip-arrow":"_styles-module__rc-slider-tooltip-arrow__35-HY"};

const CustomHandle = props => {
  const style = {
    left: props.offset + '%',
    transform: 'translateX(-50%)'
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: props.className,
    key: props.index,
    style: style,
    "data-value": props.value
  });
};

const SliderField = ({
  className,
  disabled,
  label,
  onChange,
  name,
  align: _align = 'left',
  ...props
}) => {
  const onChangeHandle = value => {
    if (onChange) onChange({
      target: {
        value,
        name
      }
    });
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$h.field, className, _align, {
      disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$h.slider
  }, /*#__PURE__*/React__default.createElement(Slider, Object.assign({
    onChange: onChangeHandle,
    tipFormatter: value => `$${value}`,
    handle: CustomHandle
  }, props))), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$h.label
  }, label));
};

var css$i = {"filters":"_styles-module__filters__kiZkv","select":"_styles-module__select__4Up3c","field":"_styles-module__field__3_9Ku"};

const StackFilters = ({
  className,
  fields,
  form,
  onChange
}) => {
  const hasSelectField = useMemo(() => Object.keys(fields).some(key => fields[key].type === 'select'), [fields]);
  if (!Object.keys(fields).length) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$i.filters, className, {
      'with-select': hasSelectField
    })
  }, Object.keys(fields).map(key => {
    switch (fields[key].type) {
      case 'select':
        return /*#__PURE__*/React__default.createElement(SelectField, {
          key: `select-${key}`,
          align: "bottom",
          className: cx(css$i.field, css$i.select),
          onChange: value => onChange(key, value),
          label: key,
          name: key,
          options: fields[key].options,
          value: Array.isArray(form[key]) ? form[key] : [form[key]]
        });

      case 'checkbox':
        return /*#__PURE__*/React__default.createElement(CheckboxField, {
          key: `checkbox-${key}`,
          className: css$i.field,
          onChange: onChange,
          label: key,
          name: key,
          value: form[key]
        });

      case 'slider':
        return /*#__PURE__*/React__default.createElement(SliderField, {
          key: `slider-${key}`,
          className: css$i.field,
          onChange: onChange,
          align: "right",
          label: key,
          name: key,
          value: form[key],
          step: null,
          min: fields[key].min,
          max: fields[key].max,
          marks: fields[key].options
        });

      default:
        return null;
    }
  }));
};

var css$j = {"field":"_styles-module__field__2DYF1","hidden":"_styles-module__hidden__3z5o2"};

const StretchTitleField = ({
  value: propValue,
  placeholder: _placeholder = '',
  className,
  onChange: onChangeProp,
  ...props
}) => {
  const [value, set] = useState(propValue);

  const onChange = event => {
    if (onChangeProp) onChangeProp(event.target.value);
    set(event.target.value);
  };

  useEffect(() => {
    set(propValue);
  }, [propValue]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$j.field, className)
  }, /*#__PURE__*/React__default.createElement("input", Object.assign({
    type: "text",
    placeholder: _placeholder,
    value: value,
    onChange: onChange
  }, props)), /*#__PURE__*/React__default.createElement("div", {
    className: css$j.hidden
  }, value && value.length ? value : _placeholder));
};

var css$k = {"fieldWrap":"_styles-module__fieldWrap__vED3t","field":"_styles-module__field__1XqN9","hidden":"_styles-module__hidden__38Nis"};

const StretchTextAreaField = forwardRef(({
  value: propValue,
  placeholder: _placeholder = '',
  className,
  onChange: onChangeProp,
  ...props
}, ref) => {
  const [value, set] = useState(propValue);

  const onChange = event => {
    if (onChangeProp) onChangeProp(event.target.value);
    set(event.target.value);
  };

  useEffect(() => {
    set(propValue);
  }, [propValue]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$k.fieldWrap
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$k.field, className)
  }, /*#__PURE__*/React__default.createElement("textarea", Object.assign({
    rows: 1,
    placeholder: _placeholder,
    value: value,
    onChange: onChange,
    ref: ref
  }, props)), /*#__PURE__*/React__default.createElement("div", {
    className: css$k.hidden
  }, value && value.length ? value : _placeholder, '\n')));
});

var css$l = {"tabs":"_styles-module__tabs__-hQvT","tab":"_styles-module__tab__2dsXN","soon":"_styles-module__soon__2_DJa"};

const Tabs = ({
  className,
  value,
  tabs,
  onChange
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$l.tabs, className)
  }, tabs.map((i, index) => /*#__PURE__*/React__default.createElement("div", {
    key: index,
    className: cx(css$l.tab, {
      active: value === i.value
    }),
    onClick: () => onChange(i.value)
  }, i.label, i.soon && /*#__PURE__*/React__default.createElement("span", {
    className: css$l.soon
  }, t('soon')))));
};

var css$m = {"field":"_styles-module__field__3PgPN","textarea":"_styles-module__textarea__2Ok_K","label":"_styles-module__label__1qnsP","error":"_styles-module__error__1C6bH"};

const TextAreaField = ({
  label,
  className,
  size: _size = 'normal',
  errors: _errors = [],
  ...props
}) => {
  const hasErrors = Boolean(_errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$m.field, className, _size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$m.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$m.textarea
  }, /*#__PURE__*/React__default.createElement("textarea", Object.assign({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$m.error
  }, _errors.join(', '))));
};

var css$n = {"tooltip":"_style-module__tooltip__rE8Jn"};

const Tooltip = ({
  children,
  overlayContent,
  arrowContent: _arrowContent = null,
  placement: _placement = 'bottomLeft',
  trigger: _trigger = ['hover'],
  overlayStyle: _overlayStyle = {
    pointerEvents: 'none'
  },
  ...props
}) => {
  return /*#__PURE__*/React__default.createElement(RcTooltip, Object.assign({
    overlayStyle: _overlayStyle,
    arrowContent: _arrowContent,
    placement: _placement,
    trigger: _trigger,
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: css$n.tooltip
    }, overlayContent)
  }, props), children);
};

var css$o = {"switcher":"_styles-module__switcher__3NMzC"};

const ViewSwitcher = ({
  value: _value = 'grid',
  onChange,
  className
}) => {
  const [stateValue, setStateValue] = useState(_value);
  useEffect(() => {
    if (_value !== stateValue) setStateValue(_value);
  }, [_value]);

  const toggleValue = () => {
    const newValue = stateValue === 'grid' ? 'list' : 'grid';
    setStateValue(newValue);
    if (onChange) onChange(newValue);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$o.switcher, stateValue, className),
    onClick: toggleValue
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-grid"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-list"
  }));
};

const Yield = ({
  name,
  className,
  children
}) => {
  if (!name) return null;

  if (children) {
    const node = document && document.getElementById(name);
    if (!node) return null;
    return /*#__PURE__*/React__default.createElement(Portal, {
      node: node
    }, children);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: className,
    id: name
  });
};

var css$p = {"table":"_styles-module__table__2TzH3"};

const Table = ({
  data
}) => {
  const [captions, ...rows] = data;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$p.table
  }, /*#__PURE__*/React__default.createElement("table", null, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, captions.map(caption => /*#__PURE__*/React__default.createElement("th", {
    key: caption
  }, caption)))), /*#__PURE__*/React__default.createElement("tbody", null, rows.map((row, index) => /*#__PURE__*/React__default.createElement("tr", {
    key: index
  }, row.map((cell, i) => /*#__PURE__*/React__default.createElement("td", {
    key: i
  }, cell)))))));
};

const isImageType = type => /^image/.test(type);
const base64ToJSON = base64 => {
  let parsedJSON;

  try {
    parsedJSON = JSON.parse(atob(base64));
  } catch (e) {
    console.log(e);
  }

  return parsedJSON;
};

var css$q = {"view":"_styles-module__view__1T-AH","text":"_styles-module__text__6S5f-","message":"_styles-module__message__1p-0w"};

const base64ImagePrefixes = {
  'image/svg+xml': 'data:image/svg+xml;charset=utf-8;',
  'image/png': 'data:image/png;charset=utf-8;',
  'image/jpeg': 'data:image/jpeg;charset=utf-8;'
};

const View = ({
  frameId,
  attachment,
  fullAttachment,
  isList,
  className,
  requestStatus
}) => {
  const {
    t
  } = useTranslation();
  const viewRef = useRef();
  const [tableScale, setTableScale] = useState(1);
  const [viewWidth, setVieWidth] = useState(0);
  const [noRender, setNoRender] = useState(false);

  const onResizeCard = () => {
    if (viewRef.current) {
      const containerWidth = viewRef.current.parentElement.offsetWidth;
      const viewWidth = viewRef.current.offsetWidth / tableScale;
      let newScale = containerWidth / viewWidth;
      if (newScale > 1) newScale = 1;
      setTableScale(newScale);
      setVieWidth(containerWidth);
    }
  };

  useEffect(() => {
    if (window && isList) window.addEventListener('resize', onResizeCard);
    return () => {
      if (window && isList) window.removeEventListener('resize', onResizeCard);
    };
  }, []);
  useEffect(() => {
    if (noRender) setNoRender(false);
  }, [noRender]);
  useEffect(() => {
    if (attachment && attachment['application'] === 'plotly') {
      setNoRender(true);
    }

    if (attachment && attachment['application'] === 'bokeh') {
      let Bokeh;
      const json = base64ToJSON(attachment.data);
      const version = get(attachment, 'settings.bokeh_version');

      if (version && parseInt(version.split('.')[0], 10) === 2) {
        Bokeh = window.Bokeh['2.2.1'];
      } else {
        Bokeh = window.Bokeh;
      }

      if (json && document.querySelector(`#bokeh-${frameId}`)) Bokeh.embed.embed_item(json, `bokeh-${frameId}`);
    }

    if (isList) setTimeout(() => onResizeCard(), 10);
  }, [attachment]);

  const renderImage = () => {
    if (!attachment.preview) return /*#__PURE__*/React__default.createElement("img", {
      src: `${base64ImagePrefixes[attachment['content_type']]}base64,${attachment.data}`,
      alt: ""
    });else if (fullAttachment) {
      if (fullAttachment['download_url']) {
        return /*#__PURE__*/React__default.createElement("img", {
          src: fullAttachment['download_url'],
          alt: ""
        });
      } else return /*#__PURE__*/React__default.createElement("img", {
        src: `${base64ImagePrefixes[attachment['content_type']]}base64,${attachment.data}`,
        alt: ""
      });
    }
    return null;
  };

  const renderCSV = () => {
    const decodeCSV = unicodeBase64Decode(attachment.data);

    if (decodeCSV) {
      const data = parse(decodeCSV);
      if (Array.isArray(data) && data.length) return /*#__PURE__*/React__default.createElement(Table, {
        data: data
      });
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: css$q.text
    }, t('notSupportedAttachment'));
  };

  const renderPlotly = () => {
    const json = base64ToJSON(attachment.data);
    if (!json) return null;
    json.layout.width = viewWidth;
    json.layout.margin = 0;
    json.layout.autosize = true;
    if (json.config) json.config.responsive = true;else json.config = {
      responsive: true
    };
    return /*#__PURE__*/React__default.createElement(Plot, Object.assign({}, json, {
      style: {
        width: '100%',
        height: '100%'
      },
      useResizeHandler: true
    }));
  };

  const renderBokeh = () => /*#__PURE__*/React__default.createElement("div", {
    id: `bokeh-${frameId}`
  });

  const renderAttachment = () => {
    if (noRender) return null;
    if (requestStatus === 404 && isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$q.message
    }, t('notFound'));
    if (requestStatus === 404 && !isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$q.text
    }, t('noPreview'));
    if (attachment.preview && isList && isImageType(attachment['content_type'])) return /*#__PURE__*/React__default.createElement("div", {
      className: css$q.message
    }, t('noPreview'));

    switch (true) {
      case attachment['content_type'] === 'image/svg+xml':
      case attachment['content_type'] === 'image/png':
      case attachment['content_type'] === 'image/jpeg':
        return renderImage();

      case attachment['content_type'] === 'text/csv':
        return renderCSV();

      case attachment['application'] === 'plotly':
        return renderPlotly();

      case attachment['application'] === 'bokeh':
        return renderBokeh();

      case undefined:
      case isEqual(attachment, {}):
        return null;

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: isList ? css$q.message : css$q.text
        }, t('notSupportedAttachment'));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: viewRef,
    className: cx(css$q.view, className, {
      'table': attachment && attachment.data && attachment['content_type'] === 'text/csv',
      'bokeh': attachment && attachment.data && attachment['application'] === 'bokeh'
    }),
    style: attachment && attachment['content_type'] === 'text/csv' ? {
      transform: `scale(${tableScale})`
    } : {}
  }, renderAttachment());
};

const areEqual = (prevProps, nextProps) => {
  return isEqual(prevProps.attachment, nextProps.attachment);
};

var View$1 = memo(View, areEqual);

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

var actionsTypes$1 = {
  FETCH: 'stacks/attachments/FETCH',
  FETCH_SUCCESS: 'stacks/attachments/FETCH_SUCCESS',
  FETCH_FAIL: 'stacks/attachments/FETCH_FAIL'
};

const initialState$1 = {
  data: {},
  errors: {},
  requestStatus: null
};
const reducer$1 = (state = initialState$1, action) => {
  switch (action.type) {
    case actionsTypes$1.FETCH:
      return { ...state,
        data: { ...state.data,
          [action.meta.frameId]: { ...state.data[action.meta.frameId],
            [action.meta.id]: { ...(state.data[action.meta.frameId] ? state.data[action.meta.frameId][action.meta.id] : {}),
              loading: true,
              requestStatus: null,
              error: null
            }
          }
        }
      };

    case actionsTypes$1.FETCH_SUCCESS:
      return { ...state,
        data: { ...state.data,
          [action.meta.frameId]: { ...state.data[action.meta.frameId],
            [action.meta.id]: { ...action.payload,
              loading: false
            }
          }
        }
      };

    case actionsTypes$1.FETCH_FAIL:
      return { ...state,
        data: { ...state.data,
          [action.meta.frameId]: { ...state.data[action.meta.frameId],
            [action.meta.id]: {
              error: action.payload.error,
              requestStatus: action.payload.requestStatus,
              loading: false
            }
          }
        }
      };

    default:
      return state;
  }
};
const StateContext$1 = createContext();
const StateProvider = ({
  children,
  apiUrl
}) => /*#__PURE__*/React__default.createElement(StateContext$1.Provider, {
  value: useReducer(reducer$1, { ...initialState$1,
    apiUrl
  })
}, children);
const useStateValue = () => useContext(StateContext$1);

var actions = (() => {
  const [{
    apiUrl
  }, dispatch] = useStateValue();

  const fetchAttachment = async (stack, frameId, id, onSuccess) => {
    const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
    dispatch({
      type: actionsTypes$1.FETCH,
      meta: {
        frameId,
        id
      }
    });

    try {
      const request = await axios({
        baseURL: apiUrl,
        url: config.STACK_ATTACHMENT(stack, frameId, id),
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      dispatch({
        type: actionsTypes$1.FETCH_SUCCESS,
        meta: {
          frameId,
          id
        },
        payload: request.data.attachment
      });
      if (onSuccess) onSuccess();
    } catch (e) {
      let error = 'Unknown error';

      try {
        error = JSON.parse(get(e, 'request.response')).message;
      } catch (e) {
        console.log(error);
      }

      dispatch({
        type: actionsTypes$1.FETCH_FAIL,
        meta: {
          frameId,
          id
        },
        payload: {
          error
        }
      });
    }
  };

  return {
    fetchAttachment
  };
});

var css$r = {"attachment":"_styles-module__attachment__3NILI","loading-pulse":"_styles-module__loading-pulse__IhCO3","view":"_styles-module__view__3UWqG","text":"_styles-module__text__MOcaD"};

const Attachment = ({
  id,
  className,
  frameId,
  isList,
  withLoader,
  stack
}) => {
  const {
    fetchAttachment
  } = actions();
  const [{
    data,
    apiUrl
  }] = useStateValue();
  const attachment = get(data, `${frameId}.${id}`, {});
  const {
    loading,
    error,
    requestStatus
  } = attachment;
  const [loadingFullAttachment, setLoadingFullAttachment] = useState(false);
  const [fullAttachment, setFullAttachment] = useState(null);
  const prevAttachment = usePrevious(attachment);

  const fetchFullAttachment = async () => {
    setLoadingFullAttachment(true);

    try {
      const url = config.STACK_ATTACHMENT(stack, frameId, id) + '?download=true';
      const {
        data
      } = await axios({
        baseUrl: apiUrl,
        url
      });
      setFullAttachment(data.attachment);
    } catch (e) {
      console.log(e);
    }

    setLoadingFullAttachment(false);
  };

  useEffect(() => {
    if (!isList && attachment && !isEqual(prevAttachment, attachment) && attachment.preview && isImageType(attachment['content_type'])) {
      fetchFullAttachment();
    }
  }, [data]);
  useEffect(() => {
    if (!isList && typeof id === 'number' && frameId && (!attachment.data && !error || (attachment === null || attachment === void 0 ? void 0 : attachment.index) !== id)) {
      fetchAttachment(stack, frameId, id);
    }
  }, [id, frameId]);
  const [ref] = useIntersectionObserver(() => {
    if (isList && !loading && (!attachment.data && !error || attachment.data && attachment.index !== id)) fetchAttachment(stack, frameId, id);
  }, {}, [id, frameId, data]);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$r.attachment, className, {
      'is-list': isList,
      loading: loading && withLoader || loadingFullAttachment
    })
  }, !loading && /*#__PURE__*/React__default.createElement(View$1, {
    requestStatus: requestStatus,
    className: css$r.view,
    isList: isList,
    fullAttachment: fullAttachment,
    attachment: attachment
  }));
};

var chartIcon = "chart~FgFRCRzg.svg";

var css$s = {"item":"_styles-module__item__fLtf5","name":"_styles-module__name__147V3","delete":"_styles-module__delete__2PoaL","icon":"_styles-module__icon__3yxhI","top":"_styles-module__top__3aJqR","date":"_styles-module__date__2c9og"};

const Item = ({
  className,
  Component: _Component = 'div',
  data,
  deleteAction,
  renderContent,
  ...rest
}) => {
  const {
    t
  } = useTranslation();
  const ref = useRef(null);

  const onClickDelete = event => {
    event.stopPropagation();
    event.preventDefault();
    deleteAction(data.name);
  };

  return /*#__PURE__*/React__default.createElement(_Component, Object.assign({
    className: cx(css$s.item, className),
    ref: ref
  }, rest), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.icon
  }, /*#__PURE__*/React__default.createElement("img", {
    src: chartIcon,
    alt: ""
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.top
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.name
  }, data.name), /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${data.private ? '' : '-open'}`
  }), renderContent && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.additional
  }, renderContent(data))), data.head && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.date
  }, t('updated'), " ", moment(data.head.timestamp).format('L')), deleteAction && /*#__PURE__*/React__default.createElement("span", {
    className: css$s.delete,
    onClick: onClickDelete
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close"
  })));
};

var routes = {
  notFound: () => '/404',
  auth: () => '/auth',
  authLogin: () => '/auth/login',
  verifyUser: () => '/auth/verify',
  stacks: (user = ':user') => `/${user}`,
  stackDetails: (user = ':user', id = ':stack') => `/${user}/${id}` + (id === ':stack' ? '+' : ''),
  reports: (user = ':user') => `/${user}/d`,
  reportsDetails: (user = ':user', id = ':id') => `/${user}/d/${id}`,
  jobs: (user = ':user') => `/${user}/j`,
  jobsDetails: (user = ':user', id = ':id') => `/${user}/j/${id}`,
  settings: () => '/settings'
};

var useListViewSwitcher = ((id, defaultValue = 'list') => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const savedValue = localStorage.getItem(`list-view-value-${id}`);
    if (savedValue) setValue(savedValue);else setValue(defaultValue);
  }, []);

  const onChange = value => {
    setValue(value);
    localStorage.setItem(`list-view-value-${id}`, value);
  };

  return [value, onChange];
});

var css$t = {"list":"_styles-module__list__3CcWo","header":"_styles-module__header__3MHvB","title":"_styles-module__title__2HbVV","headerSide":"_styles-module__headerSide__TN8Ts","search":"_styles-module__search__3VlZv","uploadButton":"_styles-module__uploadButton__35PkI","controls":"_styles-module__controls__ee5au","viewSwitcher":"_styles-module__viewSwitcher__1boU7","sorting":"_styles-module__sorting__1S_L9","sortingButton":"_styles-module__sortingButton__1c0ym","message":"_styles-module__message__3XJKG","text":"_styles-module__text__1_wO5","itemList":"_styles-module__itemList__1fksy","item":"_styles-module__item__1RHsG","loadingItem":"_styles-module__loadingItem__1uHPv","stacks-pulse":"_styles-module__stacks-pulse__1qO_N","modal":"_styles-module__modal__1BJIQ","description":"_styles-module__description__1U-iN","buttons":"_styles-module__buttons__19NkE","button":"_styles-module__button__3jLaw"};

const List = ({
  data: _data = [],
  loading,
  deleteStack,
  currentUser,
  user,
  renderUploadStack: _renderUploadStack = () => {},
  renderItemContent
}) => {
  const {
    t
  } = useTranslation();
  const [view, setView] = useListViewSwitcher('stack-list');
  const [deletingStack, setDeletingStack] = useState(null);
  const [isShowWelcomeModal, setIsShowWelcomeModal] = useState(false);
  const [isShowUploadStackModal, setIsShowUploadStackModal] = useState(false);
  const [search, setSearch] = useState('');
  const isInitialMount = useRef(true);
  const [sorting, setSorting] = useState(null);
  const sortingItems = {
    lastSource: {
      title: t('lastChanged')
    }
  };

  const showWelcomeModal = () => setIsShowWelcomeModal(true);

  const onChangeSearch = value => setSearch(value);

  const hideWelcomeModal = () => {
    localStorage.setItem('welcome-modal-is-showing', true);
    setIsShowWelcomeModal(false);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!localStorage.getItem('welcome-modal-is-showing') && !loading && !_data.length) showWelcomeModal();
    }
  }, [_data]);

  const showUploadStackModal = event => {
    event.preventDefault();
    setIsShowUploadStackModal(true);
  };

  const hideUploadStackModal = () => setIsShowUploadStackModal(false);

  const deleteItem = () => {
    deleteStack(deletingStack);
    hideDeleteConfirmation();
  };

  const showDeleteConfirmation = name => {
    setDeletingStack(name);
  };

  const hideDeleteConfirmation = () => setDeletingStack(null);

  const getItems = () => {
    let items = [];

    if (_data && _data.length) {
      if (search.length) items = _data.filter(i => i.name.indexOf(search) >= 0);else items = _data;
    }

    return items;
  };

  const items = getItems();
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$t.list
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.title
  }, currentUser === user ? t('stacks') : t('stacksOf', {
    name: user
  })), Boolean(_data.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$t.headerSide
  }, Boolean(_data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$t.search,
    showEverything: true,
    isDark: true,
    placeholder: t('findStack'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), _renderUploadStack && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: t('uploadTooltip')
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$t.uploadButton,
    onClick: showUploadStackModal,
    color: "primary",
    variant: "contained",
    size: "small"
  }, t('uploadData'))))), !(!loading && !Boolean(_data.length)) && /*#__PURE__*/React__default.createElement("div", {
    className: css$t.controls
  }, /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    className: css$t.viewSwitcher,
    value: view,
    onChange: setView
  }), false ), loading && !Boolean(_data.length) && /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.itemList, view)
  }, new Array(view === 'grid' ? 12 : 8).fill({}).map((i, index) => /*#__PURE__*/React__default.createElement("div", {
    key: index,
    className: css$t.loadingItem
  }))), !loading && !_data.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$t.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: user
  })), !loading && !Boolean(_data.length) && currentUser === user && _renderUploadStack && _renderUploadStack(), Boolean(_data.length && items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.itemList, view)
  }, items.map((item, index) => /*#__PURE__*/React__default.createElement(Item, {
    className: css$t.item,
    Component: Link,
    key: index,
    data: item,
    to: routes.stackDetails(item.user, item.name),
    deleteAction: currentUser === item.user && showDeleteConfirmation,
    renderContent: renderItemContent
  }))), Boolean(_data.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$t.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(deletingStack),
    onClose: hideDeleteConfirmation,
    size: "confirmation",
    title: t('deleteStack'),
    className: css$t.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('areYouSureYouWantToDelete', {
    name: deletingStack
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideDeleteConfirmation,
    className: css$t.button
  }, t('cancel')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: deleteItem,
    className: css$t.button
  }, t('deleteStack')))), currentUser === user && /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowWelcomeModal,
    onClose: hideWelcomeModal,
    size: "small",
    title: `${t('welcomeToDStack')}👋`,
    className: css$t.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('yourEmailWasSuccessfullyConfirmed')), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideWelcomeModal,
    className: css$t.button
  }, t('getStarted')))), _renderUploadStack && /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowUploadStackModal,
    withCloseButton: true,
    onClose: hideUploadStackModal,
    size: "big",
    title: t('howToConnectYourDataWithDStack'),
    className: css$t.modal
  }, _renderUploadStack()));
};

var css$u = {"howto":"_styles-module__howto__3e8x1","tabs":"_styles-module__tabs__2M-II","description":"_styles-module__description__1cd6d","code":"_styles-module__code__1VE_j","footer":"_styles-module__footer__1gsjy"};

const pullPythonCode = data => {
  let a = [`\'/${data.stack}\'`];
  let params = Object.keys(data.params);

  if (params.length > 0) {
    let p = [];
    params.forEach(key => {
      if (isString(data.params[key])) p.push(`\'${key}\': \'${data.params[key]}\'`);else p.push(`\'${key}\': ${data.params[key]}`);
    });
    a.push('params={' + p.join(', ') + '}');
  }

  return `import pandas as pd
import dstack as ds

df = ds.pull(${a.join(', ')})`;
};
const pullRCode = data => {
  let a = [`\"/${data.stack}\"`];
  let params = Object.keys(data.params);

  if (params.length > 0) {
    params.forEach(key => {
      if (isString(data.params[key])) a.push(`\"${key}\" = \"${data.params[key]}\"`);else a.push(`\"${key}\" = ${data.params[key]}`);
    });
  }

  return `library(dstack)

df <- read.csv(pull(${a.join(', ')}))`;
};

const HowTo = ({
  modalMode,
  data,
  configurePythonCommand,
  configureRCommand
}) => {
  const {
    t
  } = useTranslation();
  const [activeCodeTab, setActiveCodeTab] = useState(1);
  const [activePlatformTab, setActivePlatformTab] = useState(1);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$u.howto
  }, !modalMode && /*#__PURE__*/React__default.createElement("div", {
    className: css$u.title
  }, t('howToFetchDataUsingTheAPI')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$u.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: [{
      label: t('python'),
      value: 1
    }, {
      label: t('r'),
      value: 2
    }]
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$u.tabs,
    value: activePlatformTab,
    onChange: setActivePlatformTab,
    tabs: [{
      label: t('pip'),
      value: 1
    }, {
      label: t('conda'),
      value: 2
    }]
  }), activePlatformTab === 1 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "bash"
  }, configurePythonCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "python"
  }, pullPythonCode(data))), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "r"
  }, "install.packages(\"dstack\")"), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "r"
  }, configureRCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$u.code,
    language: "r"
  }, pullRCode(data))), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks_2', {
        href: config.DOCS_URL
      })
    }
  }));
};

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

var css$v = {"frames":"_styles-module__frames__3D3R4","frames-dropdown":"_styles-module__frames-dropdown__3hapH","button":"_styles-module__button__Tn4o_","name":"_styles-module__name__YzOn7","label":"_styles-module__label__Hg7hs","dropdown":"_styles-module__dropdown__16pcp","item":"_styles-module__item__1q46l","mark":"_styles-module__mark__1h8Eq","info":"_styles-module__info__2BnTD","modal":"_styles-module__modal__pk61B","description":"_styles-module__description__2GOOp","buttons":"_styles-module__buttons__3Ml-A"};

const getFrameName = frame => moment(frame.timestamp).format('D MMM YYYY h:mm a');

const Frames = ({
  frame,
  frames,
  headId,
  onChange,
  onMarkAsHead,
  className
}) => {
  const {
    t
  } = useTranslation();
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const toggleDropdown = () => setIsShowDropdown(!isShowDropdown);

  const [frameForMarkingAsHead, setFrameForMarkingAsHead] = useState(null);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => isShowDropdown && toggleDropdown());
  if (!frames.length) return null;
  const activeFrame = frames.find(f => f.id === frame);

  const onClickItem = frameId => () => {
    toggleDropdown();
    if (frame !== frameId && onChange) onChange(frameId);
  };

  const onClickMarkAsHead = frameId => event => {
    event.stopPropagation();
    setFrameForMarkingAsHead(frameId);
    toggleDropdown();
  };

  const hideConfirmation = () => setFrameForMarkingAsHead(null);

  const confirmMarkFrameAsHead = () => {
    if (onMarkAsHead) onMarkAsHead(frameForMarkingAsHead.id);
    setFrameForMarkingAsHead(null);
  };

  if (!activeFrame) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$v.frames, className),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$v['frames-dropdown']),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.button,
    onClick: toggleDropdown
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$v.name
  }, getFrameName(activeFrame)), headId === activeFrame.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$v.label
  }, t('head')), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$v.dropdown, {
      show: isShowDropdown
    })
  }, frames.map(f => /*#__PURE__*/React__default.createElement(Tooltip, {
    key: f.id,
    placement: "rightTop",
    trigger: Boolean(f.description) ? ['hover'] : [],
    align: {
      offset: [-20, -20]
    },
    onClick: onClickItem(f.id),
    overlayContent: f.description
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.item
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$v.name
  }, getFrameName(f)), headId === f.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$v.label
  }, t('head')), headId !== f.id && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.mark,
    onClick: onClickMarkAsHead(f)
  }, t('markAsHead'))))))), activeFrame && activeFrame.description && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: activeFrame.description
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$v.info)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-variant"
  }))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(frameForMarkingAsHead),
    onClose: hideConfirmation,
    size: "confirmation",
    title: t('changeHeadRevision'),
    className: css$v.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.description
  }, t('areYouSureYouWantToChangeTheCurrentHeadRevisionToByName', {
    frame: frameForMarkingAsHead && getFrameName(frameForMarkingAsHead)
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$v.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: confirmMarkFrameAsHead,
    className: css$v.button
  }, t('yesChangeHead')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: hideConfirmation,
    className: css$v.button
  }, t('cancel')))));
};

var css$w = {"loader":"_styles-module__loader__2wNmt","title":"_styles-module__title__1Ms-2","stacks-pulse":"_styles-module__stacks-pulse__FjfKI","label":"_styles-module__label__1rFaq","description":"_styles-module__description__1Rg_O","diagram":"_styles-module__diagram__2Aj7C"};

const Loader$1 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$w.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.label
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.description
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.diagram
  }));
};

var css$x = {"tabs":"_styles-module__tabs__gaP0O","tab":"_styles-module__tab__vQ7S6"};

const Tabs$1 = ({
  className,
  value,
  items,
  onChange
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$x.tabs, className)
  }, items.map((i, index) => /*#__PURE__*/React__default.createElement("div", {
    key: index,
    className: cx(css$x.tab, {
      active: value === i.value
    }),
    onClick: () => onChange(i.value)
  }, i.label)));
};

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

var css$y = {"details":"_styles-module__details__3iAZb","header":"_styles-module__header__2kekg","title":"_styles-module__title__1zGvd","sideHeader":"_styles-module__sideHeader__1FUDu","dropdown":"_styles-module__dropdown__3axDI","description":"_styles-module__description__Y6gJz","label":"_styles-module__label__2FemD","label-tooltip":"_styles-module__label-tooltip__2Oe5S","actions":"_styles-module__actions__sZkKa","size":"_styles-module__size__Ja107","revisions":"_styles-module__revisions__bLqAO","tabs":"_styles-module__tabs__3mpfk","container":"_styles-module__container__3_I7R","filters":"_styles-module__filters__1-hdZ","attachment-head":"_styles-module__attachment-head__282UU","attachment":"_styles-module__attachment__3IGZo","modal":"_styles-module__modal__2TdJX","buttons":"_styles-module__buttons__RhHmq","button":"_styles-module__button__26mqa"};

const Details = ({
  currentFrameId,
  headId,
  onChangeHeadFrame,
  attachmentIndex,
  onChangeAttachmentIndex,
  downloadAttachment,
  onChangeFrame,
  data,
  frame,
  loading,
  currentUser,
  toggleUpload,
  backUrl,
  user,
  stack,
  renderHeader,
  renderSideHeader,
  renderSidebar,
  configurePythonCommand,
  configureRCommand
}) => {
  const {
    t
  } = useTranslation();
  const didMountRef = useRef(false);
  const {
    form,
    setForm,
    onChange
  } = useForm({});
  const [activeTab, setActiveTab] = useState();
  const [fields, setFields] = useState({});
  const [tabs, setTabs] = useState([]);
  const prevFrame = usePrevious(frame);
  const [isShowHowToModal, setIsShowHowToModal] = useState(false);

  const showHowToModal = event => {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  const hideHowToModal = () => setIsShowHowToModal(false);

  useEffect(() => {
    if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame) parseTabs();
  }, [frame]);
  const findAttach = useCallback((form, tabName, attachmentIndex) => {
    const attachments = get(frame, 'attachments');
    const fields = Object.keys(form);
    const tab = tabs.find(t => t.value === tabName);
    if (!attachments) return;

    if (fields.length || tabs.length) {
      attachments.some((attach, index) => {
        var _attach$params$tab$va, _attach$params$tab$ke;

        let valid = true;
        if (tab && ((_attach$params$tab$va = attach.params[tab.value]) === null || _attach$params$tab$va === void 0 ? void 0 : _attach$params$tab$va.type) !== 'tab' && ((_attach$params$tab$ke = attach.params[tab.key]) === null || _attach$params$tab$ke === void 0 ? void 0 : _attach$params$tab$ke.title) !== tab.value) return false;
        fields.forEach(key => {
          if (!attach.params || !isEqual(attach.params[key], form[key])) valid = false;
        });
        if (valid && !(attachmentIndex === undefined && index === 0)) onChangeAttachmentIndex(index);
        return valid;
      });
    }
  }, [tabs]);
  const findAttachDebounce = useCallback(debounce(findAttach, 300), [data, frame, findAttach]);
  useEffect(() => {
    if (didMountRef.current) findAttachDebounce(form, activeTab, attachmentIndex);
  }, [form]);
  useEffect(() => {
    if (didMountRef.current) parseParams();
  }, [activeTab]);
  useEffect(() => {
    if (!didMountRef.current) didMountRef.current = true;
  }, []);

  const getCurrentAttachment = selectedTab => {
    const attachments = get(frame, 'attachments');
    let attachment;

    if (selectedTab) {
      attachment = attachments.find(attach => {
        var _attach$params$select, _attach$params$select2;

        return ((_attach$params$select = attach.params[selectedTab.value]) === null || _attach$params$select === void 0 ? void 0 : _attach$params$select.type) === 'tab' || ((_attach$params$select2 = attach.params[selectedTab.key]) === null || _attach$params$select2 === void 0 ? void 0 : _attach$params$select2.title) === selectedTab.value;
      });
    } else if (attachmentIndex !== undefined) {
      if (attachments[attachmentIndex]) {
        attachment = attachments[attachmentIndex];
      }
    } else {
      attachment = attachments[0];
    }

    return attachment;
  };

  const parseTabs = () => {
    const attachments = get(frame, 'attachments');
    if (!attachments || !attachments.length) return;
    const tabs = parseStackTabs(attachments);
    const attachment = getCurrentAttachment();
    setTabs(tabs);

    if (attachment) {
      var _params$tab;

      const params = { ...attachment.params
      };
      const tab = Object.keys(params).find(key => {
        var _params$key;

        return ((_params$key = params[key]) === null || _params$key === void 0 ? void 0 : _params$key.type) === 'tab';
      });
      setActiveTab(((_params$tab = params[tab]) === null || _params$tab === void 0 ? void 0 : _params$tab.title) || tab || null);
    }
  };

  const parseParams = () => {
    const attachments = get(frame, 'attachments');
    const tab = tabs.find(t => t.value === activeTab);
    const attachment = getCurrentAttachment(tab);
    const fields = parseStackParams(attachments, tab);
    setFields(fields);

    if (attachment) {
      const params = { ...attachment.params
      };

      const _tab = Object.keys(params).find(key => {
        var _params$key2;

        return ((_params$key2 = params[key]) === null || _params$key2 === void 0 ? void 0 : _params$key2.type) === 'tab';
      });

      delete params[_tab];
      setForm(params);
    }
  };

  const onClickDownloadAttachment = event => {
    event.preventDefault();
    downloadAttachment();
  };

  const onChangeTab = tabName => {
    findAttachDebounce(form, tabName, attachmentIndex);
    setActiveTab(tabName);
  };

  const attachment = get(frame, `attachments[${attachmentIndex}]`);
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$1, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$y.details, {
      'with-sidebar': Boolean(renderSidebar)
    })
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToMyStacks') : t('backToStacksOF', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.title
  }, data.name, /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${data.private ? '' : '-open'}`
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.sideHeader
  }, renderSideHeader && renderSideHeader(), data && data.user === currentUser && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$y.dropdown,
    items: [{
      title: t('upload'),
      onClick: toggleUpload
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$y['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), /*#__PURE__*/React__default.createElement(Frames, {
    frames: get(data, 'frames', []),
    frame: currentFrameId,
    headId: headId,
    onMarkAsHead: onChangeHeadFrame,
    onChange: onChangeFrame,
    className: css$y.revisions
  }), Boolean(tabs.length) && /*#__PURE__*/React__default.createElement(Tabs$1, {
    className: css$y.tabs,
    onChange: onChangeTab,
    value: activeTab,
    items: tabs
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.container
  }, /*#__PURE__*/React__default.createElement(StackFilters, {
    fields: fields,
    form: form,
    onChange: onChange,
    className: cx(css$y.filters)
  }), attachment && /*#__PURE__*/React__default.createElement("div", {
    className: css$y['attachment-head']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.description
  }, attachment.description && /*#__PURE__*/React__default.createElement(MarkdownRender, {
    source: attachment.description
  })), attachment['content_type'] === 'text/csv' && /*#__PURE__*/React__default.createElement("div", {
    className: css$y.actions
  }, attachment.preview && /*#__PURE__*/React__default.createElement("div", {
    className: css$y.label
  }, t('preview'), /*#__PURE__*/React__default.createElement("div", {
    className: css$y['label-tooltip']
  }, t('theTableBelowShowsOnlyAPreview'))), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('useThisStackViaAPI')), /*#__PURE__*/React__default.createElement("span", null, t('or')), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickDownloadAttachment
  }, t('download')), attachment.length && /*#__PURE__*/React__default.createElement("span", {
    className: css$y.size
  }, "(", formatBytes(attachment.length), ")"))), frame && /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$y.attachment,
    withLoader: true,
    stack: `${user}/${stack}`,
    frameId: frame.id,
    id: attachmentIndex || 0
  })), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToFetchDataUsingTheAPI'),
    className: css$y.modal
  }, /*#__PURE__*/React__default.createElement(HowTo, {
    configurePythonCommand: configurePythonCommand,
    configureRCommand: configureRCommand,
    data: {
      stack: `${user}/${stack}`,
      params: form
    },
    modalMode: true
  })));
};

var useDebounce = ((callback, depsOrDelay, deps) => {
  let delay = 300;
  if (typeof depsOrDelay === 'number') delay = depsOrDelay;else deps = depsOrDelay;
  return useCallback(debounce(callback, delay), deps);
});

var css$z = {"upload":"_style-module__upload__1HGtr","content":"_style-module__content__zyXjr","subtitle":"_style-module__subtitle__2QLXi","field":"_style-module__field__2kyid","dragndrop":"_style-module__dragndrop__1_81H","buttons":"_style-module__buttons__1PXB0","button":"_style-module__button__1nx-b"};

const MB = 1048576;

const Upload = ({
  stack,
  className,
  isShow,
  onClose,
  refresh,
  withButton,
  apiUrl,
  user
}) => {
  const {
    t
  } = useTranslation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState(null);
  const isDidMount = useRef(true);
  const {
    form,
    onChange,
    formErrors,
    checkValidForm
  } = useForm({
    stack: stack || ''
  }, {
    stack: ['required', 'no-spaces-stack', 'stack-name']
  });
  const runValidation = useDebounce(checkValidForm);
  useEffect(() => {
    if (!isDidMount.current) runValidation();else isDidMount.current = false;
  }, [form.stack]);
  useEffect(() => {
    if (isShow !== undefined) setIsShowModal(isShow);
  }, [isShow]);

  const toggleModal = () => setIsShowModal(!isShowModal);

  const closeHandle = () => {
    if (onClose) onClose();else setIsShowModal(false);
  };

  const getErrorsText = fieldName => {
    if (formErrors[fieldName] && formErrors[fieldName].length) return [t(`formErrors.${formErrors[fieldName][0]}`)];
  };

  const submit = async () => {
    setProgress(null);
    setUploading(true);
    const params = {
      type: file.type,
      timestamp: Date.now(),
      id: v4(),
      stack: `${user}/${form.stack}`,
      size: file.size
    };
    if (file.size > MB) params.attachments = [{
      length: file.size
    }];else params.attachments = [{
      data: await fileToBase64(file)
    }];

    try {
      const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
      const {
        data
      } = await axios({
        method: 'post',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        },
        baseURL: apiUrl,
        url: config.STACK_PUSH,
        data: params
      });

      if (data.attachments && data.attachments.length) {
        const [attachment] = data.attachments;

        if (attachment['upload_url']) {
          await axios.put(attachment['upload_url'], file, {
            headers: {
              'Content-Type': 'application/octet-stream'
            },
            onUploadProgress: progressEvent => {
              const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
              setProgress(percentCompleted);
            }
          });
        }
      }

      setUploading(false);
      closeHandle();
      if (refresh) refresh();
    } catch (e) {
      closeHandle();
    }
  };

  return /*#__PURE__*/React__default.createElement(Fragment, null, withButton && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: t('uploadTooltip')
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$z.upload, className),
    size: "small",
    color: "secondary",
    onClick: toggleModal
  }, t('upload'))), /*#__PURE__*/React__default.createElement(Modal, {
    title: t('uploadFile'),
    isShow: isShowModal,
    size: "small"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.content
  }, !stack && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewStack')), /*#__PURE__*/React__default.createElement(TextField, {
    size: "middle",
    className: css$z.field,
    name: "stack",
    onChange: onChange,
    value: form.value,
    maxLength: 30,
    placeholder: `${t('stackName')}, ${t('noSpaces')}, ${t('maxSymbol', {
      count: 30
    })}`,
    errors: getErrorsText('stack')
  })), stack && file && /*#__PURE__*/React__default.createElement("div", {
    className: css$z.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewRevisionOfTheStack')), /*#__PURE__*/React__default.createElement(FileDragnDrop$1, {
    className: css$z.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$z.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: closeHandle,
    className: css$z.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel')))));
};

var css$A = {"upload":"_style-module__upload__2UOiz","content":"_style-module__content__22x3Q","subtitle":"_style-module__subtitle__2sXDC","field":"_style-module__field__3icVJ","dragndrop":"_style-module__dragndrop__30Hxh","buttons":"_style-module__buttons__3VDuj","button":"_style-module__button__2bzId"};

const MB$1 = 1048576;

const Upload$1 = ({
  stack,
  className,
  refresh,
  apiUrl,
  user
}) => {
  const {
    t
  } = useTranslation();
  const [uploading, setUploading] = useState(null);
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState(null);
  const isDidMount = useRef(true);
  const fileFieldRef = useRef(null);
  const {
    form,
    onChange,
    setForm,
    formErrors,
    checkValidForm
  } = useForm({
    stack: stack || ''
  }, {
    stack: ['required', 'no-spaces-stack', 'stack-name']
  });
  const runValidation = useDebounce(checkValidForm);
  useEffect(() => {
    if (!isDidMount.current) runValidation();else isDidMount.current = false;
  }, [form.stack]);

  const clearForm = () => {
    setFile(null);
    setForm({
      stack: ''
    });
    if (fileFieldRef.current) fileFieldRef.current.clear();
  };

  const getErrorsText = fieldName => {
    if (formErrors[fieldName] && formErrors[fieldName].length) return [t(`formErrors.${formErrors[fieldName][0]}`)];
  };

  const submit = async () => {
    setProgress(null);
    setUploading(true);
    const params = {
      type: file.type,
      timestamp: Date.now(),
      id: v4(),
      stack: `${user}/${form.stack}`,
      size: file.size
    };
    if (file.size > MB$1) params.attachments = [{
      length: file.size
    }];else params.attachments = [{
      data: await fileToBase64(file)
    }];

    try {
      const token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
      const {
        data
      } = await axios({
        method: 'post',
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        },
        baseURL: apiUrl,
        url: config.STACK_PUSH,
        data: params
      });

      if (data.attachments && data.attachments.length) {
        const [attachment] = data.attachments;

        if (attachment['upload_url']) {
          await axios.put(attachment['upload_url'], file, {
            headers: {
              'Content-Type': 'application/octet-stream'
            },
            onUploadProgress: progressEvent => {
              const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
              setProgress(percentCompleted);
            }
          });
        }
      }

      setUploading(false);
      if (refresh) refresh();
      clearForm();
    } catch (e) {
      console.log(e);
      clearForm();
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$A.upload, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.content
  }, !stack && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.subtitle
  }, t('stackName')), /*#__PURE__*/React__default.createElement(TextField, {
    size: "middle",
    className: css$A.field,
    name: "stack",
    onChange: onChange,
    value: form.value,
    maxLength: 30,
    placeholder: `${t('stackName')}, ${t('noSpaces')}, ${t('maxSymbol', {
      count: 30
    })}`,
    errors: getErrorsText('stack')
  })), stack && file && /*#__PURE__*/React__default.createElement("div", {
    className: css$A.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewRevisionOfTheStack')), /*#__PURE__*/React__default.createElement(FileDragnDrop$1, {
    ref: fileFieldRef,
    className: css$A.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), file && /*#__PURE__*/React__default.createElement("div", {
    className: css$A.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$A.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: clearForm,
    className: css$A.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel'))));
};

var css$B = {"howto":"_styles-module__howto__362z-","tabs":"_styles-module__tabs__h6zun","description":"_styles-module__description__SODNv","code":"_styles-module__code__WU2Z-","footer":"_styles-module__footer__1DRv-"};

const UploadStack = ({
  user,
  refresh,
  apiUrl,
  configurePythonCommand,
  configureRCommand,
  withFileUpload
}) => {
  const {
    t
  } = useTranslation();
  const [activeCodeTab, setActiveCodeTab] = useState(1);
  const [activePlatformTab, setActivePlatformTab] = useState(1);
  const tabs = [{
    label: t('python'),
    value: 1
  }, {
    label: t('r'),
    value: 2
  }];
  if (withFileUpload) tabs.push({
    label: t('upload'),
    value: 3
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$B.howto
  }, /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$B.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: tabs
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$B.tabs,
    value: activePlatformTab,
    onChange: setActivePlatformTab,
    tabs: [{
      label: t('pip'),
      value: 1
    }, {
      label: t('conda'),
      value: 2
    }]
  }), activePlatformTab === 1 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "bash"
  }, configurePythonCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "python"
  }, reportPlotPythonCode)), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "r"
  }, installRPackageCode), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "r"
  }, configureRCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$B.code,
    language: "r"
  }, reportPlotRCode)), activeCodeTab === 3 && /*#__PURE__*/React__default.createElement(Upload$1, {
    user: user,
    refresh: refresh,
    apiUrl: apiUrl
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks', {
        href: config.DOCS_URL
      })
    }
  }));
};

const api = apiFabric();
var useActions = (() => {
  const [{
    apiUrl
  }] = useAppStore();

  const fetchJob = ({
    user,
    id
  }) => {
    return new Promise(async resolve => {
      try {
        const request = await api.get(apiUrl + config.JOB_DETAILS(user, id));
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const runJob = params => {
    return new Promise(async resolve => {
      try {
        const request = await api.post(apiUrl + config.JOB_RUN, params);
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const stopJob = params => {
    return new Promise(async resolve => {
      try {
        const request = await api.post(apiUrl + config.JOB_STOP, params);
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const createJob = params => {
    return new Promise(async resolve => {
      try {
        const request = await api.post(apiUrl + config.JOB_CREATE, params);
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const updateJob = params => {
    return new Promise(async resolve => {
      try {
        const request = await api.post(apiUrl + config.JOB_UPDATE, params);
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const removeJob = params => {
    return new Promise(async resolve => {
      try {
        const request = await api.post(apiUrl + config.JOB_DELETE, params);
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  return {
    fetchJob,
    runJob,
    stopJob,
    createJob,
    updateJob,
    removeJob
  };
});

var css$C = {"loader":"_styles-module__loader__DHDDF","title":"_styles-module__title__3eHle","loader-pulsee":"_styles-module__loader-pulsee__3Q4hE","text":"_styles-module__text__2QdBi","table":"_styles-module__table__3c_Ia","item":"_styles-module__item__2_9nD"};

const Loader$2 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$C.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.table
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  })));
};

const JOB_DEFAULT_ESTIMATED_DURATION = 600000;
const calculateJobProgress = job => {
  const estimatedDuration = job['estimated_duration'] || JOB_DEFAULT_ESTIMATED_DURATION;
  const currentDuration = Date.now() - job.started;
  const leftDuration = estimatedDuration - currentDuration;
  const progress = Math.min(currentDuration / estimatedDuration * 100, 100).toFixed();
  return [progress, leftDuration];
};

var css$D = {"section":"_styles-module__section__3RnYw","progressBar":"_styles-module__progressBar__3xjSa","progress":"_styles-module__progress__3eEzL","time":"_styles-module__time__1q33r"};

const Progress = ({
  data,
  className,
  onlyDuration
}) => {
  const {
    t
  } = useTranslation();
  const progressTimer = useRef(null);
  const [, set] = useState(null);
  useEffect(() => {
    if (data.status === 'RUNNING') {
      clearInterval(progressTimer.current);
      progressTimer.current = setInterval(() => {
        set(Date.now());
      }, 50);
    } else {
      clearInterval(progressTimer.current);
    }

    return () => clearInterval(progressTimer.current);
  }, [data]);
  if (!data.started) return null;
  const [progress, leftDuration] = calculateJobProgress(data);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$D.section, className)
  }, !onlyDuration && /*#__PURE__*/React__default.createElement("div", {
    className: css$D.progressBar
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.progress,
    style: {
      width: `${progress}%`
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.time
  }, getFormattedDuration(leftDuration), " ", t('left')));
};

var css$E = {"row":"_styles-module__row__2f7FO","dropdown":"_styles-module__dropdown__2hTQP","cell":"_styles-module__cell__3ntzL","status":"_styles-module__status__2MUSr","progress":"_styles-module__progress__1J2il"};

const REFRESH_TIMEOUT = 2000;

const dataFormat = data => data.job;

const TableRow = memo(({
  data,
  onClickRow,
  onEdit,
  onDelete
}) => {
  var _currentUser$data;

  const {
    runJob,
    stopJob
  } = useActions();
  const [{
    currentUser,
    apiUrl
  }] = useAppStore();
  const currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;
  const {
    t
  } = useTranslation();
  const {
    user
  } = useParams();
  const [refreshInterval, setRefreshInterval] = useState(0);
  const {
    data: jobData,
    mutate
  } = useSWR([apiUrl + config.JOB_DETAILS(user, data.id), dataFormat], fetcher, {
    refreshInterval,
    initialData: data,
    revalidateOnFocus: false
  });

  const rowClick = () => {
    if (onClickRow) onClickRow(jobData);
  };

  useEffect(() => {
    if (['RUNNING', 'SCHEDULED'].indexOf(jobData === null || jobData === void 0 ? void 0 : jobData.status) >= 0) {
      if (!refreshInterval) setRefreshInterval(REFRESH_TIMEOUT);
    } else if (refreshInterval) {
      setRefreshInterval(0);
    }
  }, [jobData]);

  const onRun = async () => {
    const {
      job
    } = await runJob({
      user,
      id: jobData.id
    });
    if (job) mutate({ ...jobData,
      ...job
    });
  };

  const onStop = async () => {
    const {
      job
    } = await stopJob({
      user,
      id: jobData.id
    });
    if (job) mutate({ ...jobData,
      ...job
    });
  };

  const getTitle = () => {
    if (jobData.title && jobData.title.length) return jobData.title;else return /*#__PURE__*/React__default.createElement("span", null, "New job");
  };

  const renderStatus = () => {
    switch (jobData.status) {
      case 'SCHEDULED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$E.status
        }, t('inProgress'), "\u2026");

      case 'RUNNING':
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$E.status
        }, t('inProgress'), "\u2026", /*#__PURE__*/React__default.createElement(Progress, {
          className: css$E.progress,
          data: jobData
        }));

      case 'TIMEOUT':
        return /*#__PURE__*/React__default.createElement("div", {
          className: cx(css$E.status, 'fail')
        }, "\u26D4\uFE0F ", t('failedDueToTimeout'));

      case 'FAILED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: cx(css$E.status, 'fail')
        }, "\u26D4\uFE0F ", t('failed'));

      case 'FINISHED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: cx(css$E.status, 'success')
        }, "\u2705 ", t('completed'));

      case 'CREATED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$E.status
        }, t('neverRun'));

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$E.status
        }, t(jobData.status.toLowerCase()));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$E.row, {
      red: ['TIMEOUT', 'FAILED'].indexOf(jobData.status) > -1
    }),
    onClick: rowClick
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.cell
  }, getTitle()), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.cell
  }, t(jobData.runtime)), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.cell
  }, moment(jobData.started).format('MM-DD-YYYY [at] HH:mm')), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.cell
  }, getFormattedDuration(jobData.finished - jobData.started)), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.cell
  }, renderStatus(), currentUserName === user && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$E.dropdown,
    items: [...(['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData.status) >= 0 ? [{
      title: t('stop'),
      onClick: onStop
    }] : [{
      title: t('run'),
      onClick: onRun
    }]), {
      title: t('edit'),
      onClick: onEdit
    }, {
      title: t('delete'),
      onClick: onDelete
    }]
  })));
});

var css$F = {"list":"_styles-module__list__VXs44","title":"_styles-module__title__r4zAA","button":"_styles-module__button__21dbT","search":"_styles-module__search__1mylL","mobileSearch":"_styles-module__mobileSearch__3Oub0","text":"_styles-module__text__Ra7UV","tableWrap":"_styles-module__tableWrap__2CYWc","table":"_styles-module__table__2iL6k","tableCaptions":"_styles-module__tableCaptions__2YOUS","tableCell":"_styles-module__tableCell__3tQ5e"};

const dataFormat$1 = data => data.jobs;

const List$1 = () => {
  var _currentUser$data;

  const {
    createJob,
    removeJob
  } = useActions();
  const [{
    currentUser,
    apiUrl
  }] = useAppStore();
  const currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;
  const {
    t
  } = useTranslation();
  const [search, setSearch] = useState('');
  const {
    user
  } = useParams();
  const {
    push
  } = useHistory();
  const {
    data,
    mutate
  } = useSWR([apiUrl + config.JOB_LIST(user), dataFormat$1], fetcher);

  const onChangeSearch = value => setSearch(value);

  const getItems = () => {
    let items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(i => i.title.indexOf(search) >= 0);else items = data;
    }

    return items;
  };

  const items = getItems();

  const onAdd = async () => {
    const lastRuntime = localStorage.getItem('lastRuntime') || 'python';
    const data = await createJob({
      user,
      runtime: lastRuntime
    });
    push(routes.jobsDetails(user, data.job.id));
  };

  const getOnRemove = job => async () => {
    await removeJob({
      user,
      id: job.id
    });
    mutate(data.filter(j => j.id !== job.id));
  };

  if (!data) return /*#__PURE__*/React__default.createElement(Loader$2, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$F.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    placeholder: t('findJob'),
    size: "small",
    value: search,
    className: css$F.search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.title
  }, currentUserName === user ? t('myJobs') : t('jobsOf', {
    name: user
  }), /*#__PURE__*/React__default.createElement(Button, {
    className: css$F.button,
    variant: "contained",
    color: "primary",
    size: "small",
    onClick: onAdd
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), " ", t('newJob'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.text
  }, t('youHaveJobs', {
    count: data.length
  }), ' ', /*#__PURE__*/React__default.createElement("a", {
    href: config.DOCS_URL + '/jobs',
    target: "_blank"
  }, t('documentation'), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), "."), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('findJob'),
    className: css$F.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableWrap
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.table
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableCaptions
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableCell
  }, t('job')), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableCell
  }, t('runtime')), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableCell
  }, t('lastRun')), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableCell
  }, t('timeSpent')), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.tableCell
  }, t('status'))), items.map(item => /*#__PURE__*/React__default.createElement(TableRow, {
    data: item,
    key: item.id,
    onClickRow: () => push(routes.jobsDetails(user, item.id)),
    onEdit: () => push(routes.jobsDetails(user, item.id)),
    onDelete: getOnRemove(item)
  })))));
};

var useAppProgress = (() => {
  const [, dispatch] = useAppStore();

  const startAppProgress = () => {
    dispatch({
      type: actionsTypes.START_PROGRESS
    });
  };

  const setAppProgress = progress => {
    dispatch({
      type: actionsTypes.SET_PROGRESS,
      payload: progress
    });
  };

  const completeAppProgress = () => {
    dispatch({
      type: actionsTypes.COMPLETE_PROGRESS
    });
  };

  const resetAppProgress = () => {
    dispatch({
      type: actionsTypes.RESET_PROGRESS
    });
  };

  return {
    startAppProgress,
    setAppProgress,
    completeAppProgress,
    resetAppProgress
  };
});

var css$G = {"schedule":"_styles-module__schedule__YoEcM","dropdown":"_styles-module__dropdown__3RJdh","runtime":"_styles-module__runtime__2h8GE","dropdownButton":"_styles-module__dropdownButton__3fdRe","message":"_styles-module__message__1byIj"};

let timeout = null;

const ScheduleSettings = ({
  data,
  className,
  onChange,
  onChangeRuntime
}) => {
  const {
    t
  } = useTranslation();
  const messageRef = useRef();
  const [scheduleType, setScheduleType] = useState(data ? data.schedule.split('/')[0] : '');
  const [scheduleTime, setScheduleTime] = useState(data ? data.schedule.split('/')[1] : null);
  const [nextRunDelay, setNextRunDelay] = useState(0);
  const isDidMount = useRef(true);

  const runtimeChange = runtime => () => {
    onChangeRuntime(runtime);
    localStorage.setItem('lastRuntime', runtime);
  };

  const scheduleTypeChange = type => () => {
    setScheduleType(type);
    if (!scheduleTime) setScheduleTime('12:00');
    if (type === 'daily') type += `/${scheduleTime ? scheduleTime : '12:00'}`;
    onChange(type);
  };

  const scheduleTimeChange = time => () => {
    setScheduleTime(time);
    onChange(`${scheduleType}/${time}`);
    const runTime = moment(time, 'HH:mm');
    if (new Date().getHours() > runTime.get('hours')) runTime.add(1, 'day');
    setNextRunDelay(runTime.toDate().getTime() - Date.now());
  };

  useEffect(() => {
    if (nextRunDelay && !isDidMount.current && messageRef.current) {
      messageRef.current.classList.add('show');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        messageRef.current.classList.remove('show');
      }, 3000);
    }

    if (isDidMount.current) isDidMount.current = false;
  }, [nextRunDelay]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$G.schedule, className)
  }, t('runtime'), ":", /*#__PURE__*/React__default.createElement(Dropdown, {
    className: cx(css$G.dropdown, css$G.runtime),
    items: [{
      title: t('python'),
      onClick: runtimeChange('python')
    }, {
      title: t('r'),
      onClick: runtimeChange('r')
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$G.dropdownButton,
    color: "primary"
  }, t(data.runtime), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  }))), t('jobIs'), " ", scheduleType !== 'unscheduled' && t('scheduled'), /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$G.dropdown,
    items: [{
      title: t('unscheduled'),
      onClick: scheduleTypeChange('unscheduled')
    }, {
      title: t('daily'),
      onClick: scheduleTypeChange('daily')
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$G.dropdownButton,
    color: "primary"
  }, t(scheduleType), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  }))), scheduleType === 'daily' && /*#__PURE__*/React__default.createElement(Fragment, null, t('at'), /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$G.dropdown,
    items: new Array(24).fill(0).map((i, index) => {
      const time = `${index < 10 ? '0' + index : index}:00`;
      return {
        title: time,
        onClick: scheduleTimeChange(time)
      };
    })
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$G.dropdownButton,
    color: "primary"
  }, scheduleTime, " UTC", /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  }))), /*#__PURE__*/React__default.createElement("div", {
    ref: messageRef,
    className: cx(css$G.message, 'green-text')
  }, "The next run starts in ", getFormattedDuration(nextRunDelay))));
};

var css$H = {"editor":"_styles-module__editor__m0hwp","token":"_styles-module__token__281_3","atrule":"_styles-module__atrule__1M8ph","attr-value":"_styles-module__attr-value__T6_N1","keyword":"_styles-module__keyword__1gT7U","function":"_styles-module__function__2ZXkX","class-name":"_styles-module__class-name__upcGt","selector":"_styles-module__selector__3rmyW","attr-name":"_styles-module__attr-name__I3P48","string":"_styles-module__string__hoRdC","char":"_styles-module__char__1uxpB","builtin":"_styles-module__builtin__3xCwG","inserted":"_styles-module__inserted__2Lvrk","scroll":"_styles-module__scroll__1yHaS","content":"_styles-module__content__3cHiP","success":"_styles-module__success__1Z8bo","lineNumbers":"_styles-module__lineNumbers__1CW5r"};

const CodeEditor = ({
  value: _value = '',
  onChange,
  language,
  className,
  saved
}) => {
  const {
    t
  } = useTranslation();
  const successMessageRef = useRef();
  const lines = (_value.match(/\n/g) || []).length + 2;
  const lineNos = [...Array(lines).keys()].slice(1).join('\n');
  const isDidMount = useRef(true);
  useEffect(() => {
    if (successMessageRef.current && !isDidMount.current) if (saved) {
      successMessageRef.current.classList.add('show');
      setTimeout(() => {
        if (successMessageRef.current) successMessageRef.current.classList.remove('show');
      }, 4000);
    } else {
      successMessageRef.current.classList.remove('show');
    }
    if (isDidMount.current) isDidMount.current = false;
  }, [saved]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$H.editor, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.success,
    ref: successMessageRef
  }, t('changesSaved')), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.scroll
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.lineNumbers,
    dangerouslySetInnerHTML: {
      __html: lineNos
    }
  }), /*#__PURE__*/React__default.createElement(Editor, {
    value: _value,
    onValueChange: onChange,
    highlight: code => highlight(code, languages[language]),
    padding: 6,
    style: {
      width: '100%',
      fontFamily: '"Roboto Mono", monospace',
      fontSize: 12,
      lineHeight: '150%',
      outline: 'none'
    }
  }))));
};

var css$I = {"status":"_styles-module__status__3Pfpo"};

const Status = ({
  data
}) => {
  const {
    t
  } = useTranslation();
  if (!data.started) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$I.status
  }, t('lastRunning'), ' ', moment(data.started).format(`MM-DD-YYYY [${t('at')}] HH:mm`), /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-clock-outline"
  }), ['RUNNING', 'SCHEDULED'].indexOf(data.status) >= 0 ? /*#__PURE__*/React__default.createElement("span", null, ' ', t('inProgress'), "\u2026") : getFormattedDuration(data.finished - data.started)), data.status === 'FAILED' && /*#__PURE__*/React__default.createElement("span", {
    className: "red-text"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close-octagon-outline"
  }), t('failed')), data.status === 'TIMEOUT' && /*#__PURE__*/React__default.createElement("span", {
    className: "red-text"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close-octagon-outline"
  }), t('failedDueToTimeout')));
};

var css$J = {"logs":"_styles-module__logs__1poNo","button":"_styles-module__button__35eOC","text":"_styles-module__text__2eQos","label":"_styles-module__label__LksjJ"};

const Logs = ({
  data,
  className
}) => {
  if (!data.logs) return null;
  const {
    t
  } = useTranslation();
  const [isShown, setIsShown] = useState(true);
  const [updated] = useState(data.finished || data.started);

  const toggleShow = () => setIsShown(!isShown);

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$J.logs, className)
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$J.button,
    onClick: toggleShow,
    color: "primary",
    size: "small"
  }, t('logs')), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$J.text, {
      open: isShown
    })
  }, /*#__PURE__*/React__default.createElement("pre", null, data.logs), updated && /*#__PURE__*/React__default.createElement("div", {
    className: css$J.label
  }, t('updated'), " ", moment(updated).fromNow())));
};

var css$K = {"loader":"_styles-module__loader__2nOeY","loader-pulse":"_styles-module__loader-pulse__1Aj7Q","title":"_styles-module__title__RJ2x5","text1":"_styles-module__text1__2hZDH","text2":"_styles-module__text2__1-tIa","code":"_styles-module__code__3LgqO"};

const Loader$3 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$K.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$K.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$K.text1
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$K.text2
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$K.code
  }));
};

var css$L = {"details":"_styles-module__details__1K_mA","header":"_styles-module__header__1nmEh","dropdown":"_styles-module__dropdown__3RSoB","dropdownButton":"_styles-module__dropdownButton__2dnN2","title":"_styles-module__title__3U50H","edit":"_styles-module__edit__bgkiC","side":"_styles-module__side__3uIQ_","progress":"_styles-module__progress__1jRHi","button":"_styles-module__button__2J0VV","schedule":"_styles-module__schedule__2YXFa","codeEditor":"_styles-module__codeEditor__1M2Sw","logs":"_styles-module__logs__ZQT6g"};

const REFRESH_TIMEOUT$1 = 3000;

const dataFormat$2 = data => data.job;

const Details$1 = ({}) => {
  var _currentUser$data;

  const {
    runJob,
    stopJob,
    updateJob,
    removeJob
  } = useActions();
  const {
    setAppProgress,
    resetAppProgress
  } = useAppProgress();
  const {
    user,
    id
  } = useParams();
  const [refreshInterval, setRefreshInterval] = useState(0);
  const [{
    currentUser,
    apiUrl
  }] = useAppStore();
  const currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;
  const {
    data: jobData,
    error,
    mutate
  } = useSWR([apiUrl + config.JOB_DETAILS(user, id), dataFormat$2], fetcher, {
    refreshInterval
  });
  const {
    push
  } = useHistory();
  const {
    t
  } = useTranslation();
  const [titleValue, setTitleValue] = useState('');
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [codeSaved, setCodeSaved] = useState(true);
  const progressTimer = useRef(null);

  const update = async params => {
    const data = await updateJob(params);
    mutate({ ...jobData,
      ...data.job
    });
  };

  const updateDebounce = useDebounce(update, 1000, []);
  const updateLongDebounce = useDebounce(update, 2000, []);
  const prevData = usePrevious(jobData);
  useEffect(() => {
    window.addEventListener('keydown', detectEnterPress);
    return () => window.removeEventListener('keydown', detectEnterPress);
  }, [jobData, code]);
  useEffect(() => {
    if (jobData) {
      setTitleValue(jobData.title);
      setCode(jobData.code);
    }
  }, []);

  const detectEnterPress = event => {
    if (event.code === 'Enter' && (event.shiftKey || event.ctrlKey)) {
      event.preventDefault();
      if (!running && !stopping) onClickRun();
    }
  };

  useEffect(() => {
    if (['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData === null || jobData === void 0 ? void 0 : jobData.status) >= 0) {
      clearInterval(progressTimer.current);
      progressTimer.current = setInterval(() => {
        const [progress] = calculateJobProgress(jobData);
        setAppProgress(progress);
      }, 50);
    } else {
      clearInterval(progressTimer.current);
    }

    return () => clearInterval(progressTimer.current);
  }, [refreshInterval, jobData]);
  useEffect(() => {
    if ((prevData === null || prevData === void 0 ? void 0 : prevData.id) !== (jobData === null || jobData === void 0 ? void 0 : jobData.id)) {
      setTitleValue(jobData.title);
      setCode(jobData.code);
    }

    if (['RUNNING', 'SCHEDULED'].indexOf(jobData === null || jobData === void 0 ? void 0 : jobData.status) >= 0) {
      if (!refreshInterval) setRefreshInterval(REFRESH_TIMEOUT$1);
    } else if (refreshInterval) {
      setRefreshInterval(0);
      resetAppProgress();
    }

    return () => {
      resetAppProgress();
    };
  }, [jobData]);

  const onChangeTitle = value => {
    setTitleValue(value);
    updateDebounce({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      title: value
    });
  };

  const onChangeCode = value => {
    setCode(value);
    setCodeSaved(false);
    updateLongDebounce({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      code: value
    }, () => setCodeSaved(true));
  };

  const onChangeRuntime = runtime => {
    update({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      runtime: runtime
    });
  };

  const onChangeSchedule = schedule => {
    update({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      schedule: schedule
    });
  };

  const onClickRun = async () => {
    setRunning(true);

    try {
      const data = await runJob({
        user: user,
        id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
        code
      });
      mutate({ ...jobData,
        ...data
      });
      setRefreshInterval(REFRESH_TIMEOUT$1);
    } catch (e) {
      console.log(e);
    }

    setRunning(false);
  };

  const onClickStop = async () => {
    setStopping(true);

    try {
      const data = await stopJob({
        user: user,
        id: jobData === null || jobData === void 0 ? void 0 : jobData.id
      });
      mutate({ ...jobData,
        ...data
      });
    } catch (e) {
      console.log(e);
    }

    setStopping(false);
  };

  const onClickDelete = async () => {
    await removeJob({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id
    });
    push(routes.jobs(user));
  };

  if (!jobData && !error) return /*#__PURE__*/React__default.createElement(Loader$3, null);
  if ((error === null || error === void 0 ? void 0 : error.status) === 403) return /*#__PURE__*/React__default.createElement(AccessForbidden, null, t('youDontHaveAnAccessToThisJob'), ".", isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(Link, {
    to: routes.dashboards(currentUserName)
  }, t('goToMyJobs'))));
  if ((error === null || error === void 0 ? void 0 : error.status) === 404) return /*#__PURE__*/React__default.createElement(NotFound, null, t('theJobYouAreRookingForCouldNotBeFound'), ' ', isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Link, {
    to: routes.dashboards(currentUserName)
  }, t('goToMyJobs')), "."));
  if (!jobData) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$L.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: routes.jobs(user)
  }, currentUserName === user ? t('backToJobs') : t('backToJobsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$L.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$L.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$L.edit,
    value: titleValue,
    onChange: onChangeTitle,
    readOnly: currentUserName !== user,
    placeholder: t('newJob')
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$L.side
  }, jobData.status === 'RUNNING' && /*#__PURE__*/React__default.createElement(Progress, {
    onlyDuration: true,
    className: css$L.progress,
    data: jobData
  }), jobData.status === 'FAILED' && /*#__PURE__*/React__default.createElement("div", {
    className: "red-text"
  }, t('sorryButYourCodeDoesntLookLikePythonJob')), ['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData.status) >= 0 ? /*#__PURE__*/React__default.createElement(Button, {
    className: css$L.button,
    color: "fail",
    size: "small",
    variant: "contained",
    disabled: stopping,
    onClick: onClickStop
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-pause"
  }), t('stop')) : /*#__PURE__*/React__default.createElement(Button, {
    className: css$L.button,
    color: "success",
    size: "small",
    variant: "contained",
    disabled: running,
    onClick: onClickRun
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-play"
  }), t('run'))), currentUserName === user && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$L.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$L.dropdownButton,
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  })))), /*#__PURE__*/React__default.createElement(Status, {
    data: jobData
  }), /*#__PURE__*/React__default.createElement(ScheduleSettings, {
    className: css$L.schedule,
    data: jobData,
    onChange: onChangeSchedule,
    onChangeRuntime: onChangeRuntime
  }), /*#__PURE__*/React__default.createElement(CodeEditor, {
    className: css$L.codeEditor,
    value: code,
    onChange: onChangeCode,
    language: jobData.runtime,
    saved: codeSaved
  }), /*#__PURE__*/React__default.createElement(Logs, {
    className: css$L.logs,
    data: jobData
  }));
};

var css$M = {"jobs":"_styles-module__jobs__z2_YO"};

const Jobs = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$M.jobs
  }, /*#__PURE__*/React__default.createElement(Switch, null, /*#__PURE__*/React__default.createElement(Route, {
    path: routes.jobs(),
    exact: true,
    component: List$1
  }), /*#__PURE__*/React__default.createElement(Route, {
    path: routes.jobsDetails(),
    component: Details$1
  })));
};

var css$N = {"item":"_styles-module__item__2TtG-","preview":"_styles-module__preview__l7PkQ","label":"_styles-module__label__IluCM","previewWrap":"_styles-module__previewWrap__JeLjN","emptyMessage":"_styles-module__emptyMessage__3FYnh","attachment":"_styles-module__attachment__29ErP","section":"_styles-module__section__t4Sh3","content":"_styles-module__content__1PvDk","name":"_styles-module__name__246Ao","by":"_styles-module__by__15CWL","permissions":"_styles-module__permissions__Venzr","dropdown":"_styles-module__dropdown__3zDl9","preview-stack-pulse":"_styles-module__preview-stack-pulse__1TX_d"};

const Item$1 = ({
  dashboard,
  deleteDashboard,
  user,
  renderContent
}) => {
  const {
    t
  } = useTranslation();
  const ref = useRef(null);
  const hasStacks = dashboard.cards && Boolean(dashboard.cards.length);
  const card = dashboard.cards.find(c => get(c, 'head.id'));
  const isShowDropdown = Boolean(deleteDashboard);
  return /*#__PURE__*/React__default.createElement(Link, {
    to: `/${user}/d/${dashboard.id}`,
    className: css$N.item,
    ref: ref
  }, Boolean(dashboard.cards.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$N.label
  }, t('stacksWithCount', {
    count: dashboard.cards.length
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$N.previewWrap
  }, hasStacks ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$N.attachment,
    isList: true,
    withLoader: true,
    frameId: card.head.id,
    stack: card.stack,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$N.emptyMessage
  }, t('emptyDashboard'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$N.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$N.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$N.name
  }, dashboard.title, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${dashboard.private ? '' : '-open'}`
  })), user !== dashboard.user && /*#__PURE__*/React__default.createElement("div", {
    className: css$N.by
  }, t('by'), " ", dashboard.user), renderContent && renderContent(dashboard)), isShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$N.dropdown,
    items: [{
      title: t('delete'),
      onClick: deleteDashboard
    }]
  })));
};

var css$O = {"loader":"_styles-module__loader__Tepr9","text":"_styles-module__text__123Jw","dashboards-pulse":"_styles-module__dashboards-pulse__DeSvR","grid":"_styles-module__grid__37UOy","item":"_styles-module__item__B93bY","pic":"_styles-module__pic__33hqz","section":"_styles-module__section__3jX_z"};

const Loader$4 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$O.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$O.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$O.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$O.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$O.section
  }))));
};

const api$1 = apiFabric();
var useActions$1 = (() => {
  const [{
    apiUrl
  }] = useAppStore();

  const createReport = userName => {
    return new Promise(async resolve => {
      try {
        const request = await api$1.post(apiUrl + config.DASHBOARD_CREATE, {
          user: userName
        });
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const updateReport = (userName, id, fields) => {
    return new Promise(async resolve => {
      try {
        const request = await api$1.post(apiUrl + config.DASHBOARD_UPDATE, {
          user: userName,
          id,
          ...fields
        });
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const deleteReport = (userName, reportId) => {
    return new Promise(async resolve => {
      try {
        const request = await api$1.post(apiUrl + config.DASHBOARD_DELETE, {
          user: userName,
          id: reportId
        });
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const reportInsertCard = (userName, id, cards, index) => {
    return new Promise(async resolve => {
      try {
        const request = await api$1.post(apiUrl + config.DASHBOARD_CARDS_INSERT + '?attachments=true', {
          user: userName,
          dashboard: id,
          cards,
          index
        });
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const reportUpdateCard = (userName, id, stack, fields) => {
    return new Promise(async resolve => {
      try {
        const request = await api$1.post(apiUrl + config.DASHBOARD_CARDS_UPDATE, {
          user: userName,
          dashboard: id,
          stack,
          ...fields
        });
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  const reportDeleteCard = (userName, id, stack) => {
    return new Promise(async resolve => {
      try {
        const request = await api$1.post(apiUrl + config.DASHBOARD_CARDS_DELETE, {
          user: userName,
          dashboard: id,
          stack
        });
        resolve(request.data);
      } catch (e) {
        resolve({});
      }
    });
  };

  return {
    createReport,
    deleteReport,
    updateReport,
    reportInsertCard,
    reportUpdateCard,
    reportDeleteCard
  };
});

var css$P = {"list":"_styles-module__list__uwcI_","title":"_styles-module__title__36F7e","search":"_styles-module__search__1HsPY","mobileSearch":"_styles-module__mobileSearch__3JBKO","text":"_styles-module__text__11SLK","grid":"_styles-module__grid__2KJdC","add":"_styles-module__add__3vd7A","caption":"_styles-module__caption__2_R7F"};

const dataFormat$3 = data => data.dashboards;

const List$2 = ({}) => {
  var _currentUser$data;

  const [search, setSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const [{
    currentUser,
    apiUrl
  }] = useAppStore();
  const currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;
  const {
    createReport,
    deleteReport
  } = useActions$1();
  const {
    t
  } = useTranslation();
  const {
    user
  } = useParams();
  const {
    push
  } = useHistory();
  const {
    data,
    error,
    mutate
  } = useSWR([apiUrl + config.DASHBOARD_LIST(user), dataFormat$3], fetcher);
  const items = useMemo(() => {
    let items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(i => i.title.indexOf(search) >= 0);else items = data;
    }

    return items;
  }, [data, search]);

  const onChangeSearch = value => setSearch(value);

  const create = async () => {
    setCreating(true);
    const data = await createReport(user);
    setCreating(false);
    push(routes.reportsDetails(user, data.dashboard.id));
  };

  const getDeleteFunc = id => async () => {
    await deleteReport(user, id);
    mutate(data.filter(r => r.id !== id));
  };

  if ((error === null || error === void 0 ? void 0 : error.status) === 404) return /*#__PURE__*/React__default.createElement(NotFound, null, t('theDashboardYouAreRookingForCouldNotBeFound'), ' ', isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Link, {
    to: routes.reportsDetails(currentUserName)
  }, t('goToMyDashboards')), "."));
  if (!data) return /*#__PURE__*/React__default.createElement(Loader$4, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$P.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$P.search,
    placeholder: t('findDashboard'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$P.title
  }, currentUserName === user ? t('myDashboards') : t('dashboardsOf', {
    name: user
  }), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("span", null, data.length)), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$P.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$P.grid
  }, currentUserName === user && /*#__PURE__*/React__default.createElement("div", {
    onClick: create,
    className: cx(css$P.add, {
      disabled: creating
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$P.caption
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('newDashboard'))), items.map((item, index) => /*#__PURE__*/React__default.createElement(Item$1, {
    key: index,
    user: user,
    dashboard: item,
    deleteDashboard: currentUserName === item.user && getDeleteFunc(item.id)
  }))));
};

var css$Q = {"loader":"_styles-module__loader__3meGS","text":"_styles-module__text__2fWbA","dashboards-details-pulse":"_styles-module__dashboards-details-pulse__nJVCo","filters":"_styles-module__filters__3RT0J","grid":"_styles-module__grid__qat5v","item":"_styles-module__item__2kTBz"};

const Loader$5 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.filters
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.item
  })));
};

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }

  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;
  return move(array, index, newIndex);
}

const GridContext = createContext({
  items: []
});
class GridProvider extends Component {
  constructor(props) {
    super(props);

    this.setItems = items => this.setState({
      items
    });

    this.moveItem = (sourceId, destinationId) => {
      const sourceIndex = this.state.items.findIndex(item => item.id === sourceId);
      const destinationIndex = this.state.items.findIndex(item => item.id === destinationId);

      if (sourceId === -1 || destinationId === -1) {
        return;
      }

      const offset = destinationIndex - sourceIndex;
      this.setState(state => ({
        items: moveElement(state.items, sourceIndex, offset)
      }));
    };

    this.state = {
      items: [],
      moveItem: this.moveItem,
      setItems: this.setItems
    };
  }

  render() {
    return /*#__PURE__*/React__default.createElement(GridContext.Provider, {
      value: this.state
    }, this.props.children);
  }

}

var css$R = {"loader":"_styles-module__loader__3bVFk","text":"_styles-module__text__2ZWwD","stacks-pulse":"_styles-module__stacks-pulse__32IBp","grid":"_styles-module__grid__1NGPz","item":"_styles-module__item__pEfso","pic":"_styles-module__pic__3Cu55","section":"_styles-module__section__3VyE7"};

const Loader$6 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$R.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$R.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$R.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$R.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$R.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$R.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.section
  }))));
};

var css$S = {"stacks":"_style-module__stacks__1EVMf","grid":"_style-module__grid__23g1_","search":"_style-module__search__2aMVS","message":"_style-module__message__1MJtk","text":"_style-module__text__3eeN7","item":"_style-module__item__1S3Mz","checkbox":"_style-module__checkbox__1Zf0d","buttons":"_style-module__buttons__1HBY_","button":"_style-module__button__1m3l6"};

const dataFormat$4 = data => data.stacks;

const AddStacksModal = ({
  isShow,
  onClose,
  onAddStacks
}) => {
  var _currentUser$data;

  const {
    t
  } = useTranslation();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [{
    currentUser,
    apiUrl
  }] = useAppStore();
  const currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;
  const {
    data
  } = useSWR([apiUrl + config.STACKS_LIST(params.user), dataFormat$4], fetcher);
  useEffect(() => {
    if (!isShow) {
      setSelected([]);
      setSearchQuery('');
    }
  }, [isShow]);
  const items = useMemo(() => {
    let items = [];

    if (data && data.length) {
      if (searchQuery.length) items = data.filter(i => i.name.indexOf(searchQuery) >= 0);else items = data;
    }

    return items;
  }, [data, searchQuery]);

  const onChangeSearch = value => setSearchQuery(value);

  const getFullStackName = stack => `${stack.user}/${stack.name}`;

  const isChecked = stack => {
    const stackName = getFullStackName(stack);
    return selected.findIndex(i => i === stackName) >= 0;
  };

  const getOnClickStack = stack => () => {
    const stackName = getFullStackName(stack);

    if (isChecked(stack)) {
      const filtered = selected.filter(i => i !== stackName);
      setSelected(filtered);
    } else {
      setSelected([...selected, stackName]);
    }
  };

  const submit = () => {
    if (onAddStacks) onAddStacks(selected);
    onClose();
  };

  const isUserOwner = currentUserName === params.user;
  return /*#__PURE__*/React__default.createElement(Modal, {
    dialogClassName: css$S.stacks,
    isShow: isShow,
    title: t('selectStacks'),
    onClose: onClose,
    withCloseButton: true
  }, data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$S.search,
    isDark: true,
    size: "middle",
    showEverything: true,
    placeholder: t('findStack'),
    value: searchQuery,
    onChange: onChangeSearch
  }), !data && /*#__PURE__*/React__default.createElement(Loader$6, null), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$S.message
  }, isUserOwner ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: params.user
  })), data && Boolean(data.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$S.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), data && Boolean(data.length && items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$S.grid
  }, items.map((item, index) => /*#__PURE__*/React__default.createElement("div", {
    className: css$S.item,
    key: index,
    onClick: getOnClickStack(item)
  }, /*#__PURE__*/React__default.createElement(CheckboxField, {
    className: css$S.checkbox,
    value: isChecked(item),
    readOnly: true
  }), /*#__PURE__*/React__default.createElement(Item, {
    data: item
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: css$S.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$S.button,
    color: "primary",
    variant: "contained",
    disabled: !selected.length,
    onClick: submit
  }, t('addSelectedStacks')), /*#__PURE__*/React__default.createElement(Button, {
    className: css$S.button,
    color: "secondary",
    variant: "contained",
    onClick: onClose
  }, t('cancel')))));
};

var css$T = {"card":"_styles-module__card__2USXU","inner":"_styles-module__inner__nCWYo","head":"_styles-module__head__3Ir7x","name":"_styles-module__name__dAh2C","nameEdit":"_styles-module__nameEdit__3U2XI","nameValue":"_styles-module__nameValue__1d1pL","info":"_styles-module__info__1KbVf","dropdown":"_styles-module__dropdown__3Fjm5","button":"_styles-module__button__3jXy5","move":"_styles-module__move__1XXQ2","viewSwitcher":"_styles-module__viewSwitcher__2EIG0","cardControls":"_styles-module__cardControls__M80-o","description":"_styles-module__description__1od1n","addDesc":"_styles-module__addDesc__24azt","infoTime":"_styles-module__infoTime__ISfic","emptyMessage":"_styles-module__emptyMessage__3Fu27","attachment":"_styles-module__attachment__3x5M9"};

const viewValueMap = {
  grid: 1,
  list: 2
};
const Card = memo(({
  data,
  className,
  deleteCard,
  updateCard,
  filters,
  forwardedRef,
  moveAvailable
}) => {
  var _data$description;

  const [title, setTitle] = useState(data.title);
  const [columns, setColumns] = useState(data.columns);
  const descFieldRef = useRef();
  const isMounted = useRef(false);
  const isHoveredMoveBtn = useRef(false);
  const [isShowDesc, setIsShowDesc] = useState((_data$description = data.description) === null || _data$description === void 0 ? void 0 : _data$description.length);
  const prevIsShowDesc = usePrevious$1(isShowDesc);
  const {
    t
  } = useTranslation();
  const headId = get(data, 'head.id');
  const stackOwner = data.stack.split('/')[0];
  const [attachmentIndex, setAttachmentIndex] = useState(0);
  const [cardParams, setCardParams] = useState([]);
  useEffect(() => {
    const params = parseStackParams(get(data, 'head.attachments', []));
    if (params) setCardParams(Object.keys(params));
  }, [data]);
  useEffect(() => {
    findAttach();
  }, [filters]);
  useEffect(() => {
    if (forwardedRef.current) forwardedRef.current.addEventListener('dragstart', event => {
      if (!isHoveredMoveBtn.current) {
        event.stopPropagation();
        event.preventDefault();
      }
    });
  }, [forwardedRef]);
  useEffect(() => {
    if (isMounted.current && prevIsShowDesc !== isShowDesc && descFieldRef.current) descFieldRef.current.focus();
  }, [isShowDesc]);
  useEffect(() => {
    isMounted.current = true;
  }, []);

  const findAttach = () => {
    const attachments = get(data, 'head.attachments');
    const fields = Object.keys(filters).filter(f => cardParams.indexOf(f) >= 0);
    if (!attachments) return;

    if (fields.length) {
      attachments.some((attach, index) => {
        let valid = true;
        fields.forEach(key => {
          if (!attach.params || !isEqual(attach.params[key], filters[key])) valid = false;
        });
        if (valid) setAttachmentIndex(index);
        return valid;
      });
    } else setAttachmentIndex(0);
  };

  const onUpdate = updateCard ? useDebounce(updateCard, [updateCard]) : () => {};

  const onChangeTitle = event => {
    setTitle(event.target.value);
    onUpdate({
      title: event.target.value
    });
  };

  const onChangeView = view => {
    const columns = viewValueMap[view];
    setColumns(columns);
    onUpdate({
      columns
    });
  };

  const onChangeDescription = description => {
    setColumns(columns);
    onUpdate({
      description
    });
  };

  const onEnterMove = () => {
    isHoveredMoveBtn.current = true;
  };

  const onLeaveMove = () => {
    isHoveredMoveBtn.current = false;
  };

  const onBlurDescription = () => {
    var _data$description2;

    if (!((_data$description2 = data.description) === null || _data$description2 === void 0 ? void 0 : _data$description2.length)) setIsShowDesc(false);
  };

  const addDesc = () => setIsShowDesc(true);

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$T.card, `col-${columns}`, className),
    ref: forwardedRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$T.inner
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$T.head
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$T.name, {
      readonly: !updateCard
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$T.nameValue
  }, (title === null || title === void 0 ? void 0 : title.length) ? title : t('title')), /*#__PURE__*/React__default.createElement("input", {
    value: title,
    type: "text",
    placeholder: t('title'),
    onChange: onChangeTitle,
    className: cx(css$T.nameEdit, {
      active: !(title === null || title === void 0 ? void 0 : title.length)
    })
  })), /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", null, t('updatedByName', {
      name: stackOwner
    })), data.head && /*#__PURE__*/React__default.createElement("div", {
      className: css$T.infoTime
    }, moment(data.head.timestamp).format('D MMM YYYY')))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$T.info
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  }))), /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$T.button, css$T.link),
    color: "secondary",
    Component: Link,
    to: `/${data.stack}`
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$T.cardControls
  }, deleteCard && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$T.button),
    color: "secondary",
    onClick: deleteCard
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-trash-can-outline"
  })), moveAvailable && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$T.button, css$T.move),
    color: "secondary",
    onMouseEnter: onEnterMove,
    onMouseLeave: onLeaveMove
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-cursor-move"
  })), /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    onChange: onChangeView,
    value: data.columns === 1 ? 'grid' : 'list',
    className: css$T.viewSwitcher
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$T.description
  }, isShowDesc && /*#__PURE__*/React__default.createElement(StretchTextAreaField, {
    value: data.description,
    ref: descFieldRef,
    placeholder: t('description'),
    onChange: onChangeDescription,
    onBlur: onBlurDescription
  }), !isShowDesc && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$T.addDesc),
    color: "secondary",
    onClick: addDesc
  }, "+ ", t('addDescription'))), headId ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$T.attachment,
    isList: true,
    withLoader: true,
    stack: data.stack,
    frameId: headId,
    id: attachmentIndex
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$T.emptyMessage
  }, t('emptyDashboard'))));
});

const DnDItem = memo(({
  id,
  onMoveItem,
  children
}) => {
  const ref = useRef(null);
  const [, connectDrag] = useDrag({
    item: {
      id,
      type: 'IMG'
    },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });
  const [, connectDrop] = useDrop({
    accept: 'IMG',
    drop: hoveredOverItem => {
      if (hoveredOverItem.id !== id) {
        onMoveItem(hoveredOverItem.id, id);
      }
    }
  });
  connectDrag(ref);
  connectDrop(ref);
  return React__default.Children.map(children, child => React__default.cloneElement(child, {
    forwardedRef: ref
  }));
});

var css$U = {"details":"_styles-module__details__1YGMH","header":"_styles-module__header__1lU-L","title":"_styles-module__title__2HPT5","edit":"_styles-module__edit__3ezYE","sideHeader":"_styles-module__sideHeader__2PqMZ","addButton":"_styles-module__addButton__4KCh5","description":"_styles-module__description__1peNb","addDesc":"_styles-module__addDesc__-FjzY","dropdown":"_styles-module__dropdown__2-VRH","section":"_styles-module__section__2_7da","cards":"_styles-module__cards__3OOzf","fields":"_styles-module__fields__WLi30","filters":"_styles-module__filters__2q551","empty":"_styles-module__empty__13-9o"};

const dataFormat$5 = data => data.dashboard;

const Details$2 = ({
  renderHeader,
  renderSideHeader
}) => {
  var _currentUser$data, _data$description;

  const {
    t
  } = useTranslation();
  const {
    user,
    id
  } = useParams();
  const {
    push
  } = useHistory();
  const {
    items,
    moveItem,
    setItems
  } = useContext(GridContext);
  const [{
    currentUser,
    apiUrl
  }] = useAppStore();
  const currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;
  const {
    deleteReport,
    updateReport,
    reportInsertCard,
    reportDeleteCard,
    reportUpdateCard
  } = useActions$1();
  const descFieldRef = useRef();
  const isMounted = useRef(false);
  const [isShowStacksModal, setIsShowStacksModal] = useState(false);
  const {
    form,
    setForm,
    onChange
  } = useForm({});
  const [fields, setFields] = useState({});

  const setGridItems = cardsItems => setItems(cardsItems.map(card => ({
    id: card.index,
    card
  })));

  const {
    data,
    mutate,
    error
  } = useSWR([apiUrl + config.DASHBOARD_DETAILS(user, id), dataFormat$5], fetcher);
  const [isShowDesc, setIsShowDesc] = useState(Boolean(data === null || data === void 0 ? void 0 : (_data$description = data.description) === null || _data$description === void 0 ? void 0 : _data$description.length));
  const prevIsShowDesc = usePrevious(isShowDesc);
  const prevData = usePrevious(data);
  useEffect(() => {
    var _data$description2;

    if (data === null || data === void 0 ? void 0 : data.cards) setGridItems(data === null || data === void 0 ? void 0 : data.cards);
    if (!isEqual(prevData, data) && (data === null || data === void 0 ? void 0 : data.cards)) parseParams();
    if ((prevData === null || prevData === void 0 ? void 0 : prevData.description) !== (data === null || data === void 0 ? void 0 : data.description)) setIsShowDesc(Boolean(data === null || data === void 0 ? void 0 : (_data$description2 = data.description) === null || _data$description2 === void 0 ? void 0 : _data$description2.length));
    return () => setGridItems([]);
  }, [data]);
  useEffect(() => {
    if (isMounted.current && prevIsShowDesc !== isShowDesc && descFieldRef.current) descFieldRef.current.focus();
  }, [isShowDesc]);
  useEffect(() => {
    isMounted.current = true;
  }, []);

  const parseParams = () => {
    const fields = data.cards.reduce((result, card) => {
      const cardFields = parseStackParams(get(card, 'head.attachments', [])) || {};
      Object.keys(cardFields).forEach(fieldName => {
        if (result[fieldName]) {
          if (cardFields[fieldName].type === 'select') {
            result[fieldName].options = unionBy(result[fieldName].options, cardFields[fieldName].options, 'value');
          }

          if (cardFields[fieldName].type === 'slider') {
            result[fieldName].options = { ...result[fieldName].options,
              ...cardFields[fieldName].options
            };
            result[fieldName].min = Math.min(result[fieldName].min, cardFields[fieldName].min);
            result[fieldName].max = Math.max(result[fieldName].max, cardFields[fieldName].max);
          }
        } else {
          result[fieldName] = cardFields[fieldName];
        }
      });
      return result;
    }, {});
    const defaultFilterValues = Object.keys(fields).reduce((result, fieldName) => {
      if (fields[fieldName].type === 'select') result[fieldName] = fields[fieldName].options[0].value;
      if (fields[fieldName].type === 'slider') result[fieldName] = fields[fieldName].options[0];
      if (fields[fieldName].type === 'checkbox') result[fieldName] = false;
      return result;
    }, {});
    setForm(defaultFilterValues);
    setFields(fields);
  };

  const update = async params => {
    await updateReport(user, id, params);
  };

  const debounceUpdateTitle = useDebounce(async fields => {
    await update(fields);
  }, 300);

  const onChangeTitle = title => {
    data.title = title;
    mutate(data, false);
    debounceUpdateTitle({
      title
    });
  };

  const debounceUpdateDescription = useDebounce(async fields => {
    await update(fields);
  }, 300);

  const onChangeDescription = description => {
    data.description = description;
    mutate(data, false);
    debounceUpdateDescription({
      description
    });
  };

  const addStacks = async stacks => {
    var _data$cards;

    const {
      dashboard
    } = await reportInsertCard(user, id, stacks.map(stack => ({
      stack
    })), data === null || data === void 0 ? void 0 : (_data$cards = data.cards) === null || _data$cards === void 0 ? void 0 : _data$cards.length);
    mutate(dashboard, false);
  };

  const getDeleteCardFunc = stack => async () => {
    const {
      dashboard
    } = await reportDeleteCard(user, id, stack);
    mutate(dashboard, false);
  };

  const getUpdatedCardFunc = stack => async fields => {
    const {
      cards
    } = await reportUpdateCard(user, id, stack, fields);
    mutate({ ...data,
      cards
    }, false);
  };

  const moveCard = (indexFrom, indexTo) => {
    if (indexTo < 0 || indexFrom < 0) return;
    const {
      stack
    } = items[indexFrom].card;
    moveItem(indexFrom, indexTo);
    reportUpdateCard(user, id, stack, {
      index: indexTo
    }).catch(console.log);
  };

  const deleteDashboard = async () => {
    await deleteReport(user, id);
    push(routes.reports(user));
  };

  const renderFilters = () => {
    if (!Object.keys(fields).length) return null;
    const hasSelectField = Object.keys(fields).some(key => fields[key].type === 'select');
    return /*#__PURE__*/React__default.createElement(StackFilters, {
      fields: fields,
      form: form,
      onChange: onChange,
      className: cx(css$U.filters, {
        'with-select': hasSelectField
      })
    });
  };

  const toggleAddStackModal = event => {
    if (event === null || event === void 0 ? void 0 : event.target) event.preventDefault();
    setIsShowStacksModal(isShow => !isShow);
  };

  const onBlurDescription = () => {
    var _data$description3;

    if (!((_data$description3 = data.description) === null || _data$description3 === void 0 ? void 0 : _data$description3.length)) setIsShowDesc(false);
  };

  const addDesc = () => setIsShowDesc(true);

  if ((error === null || error === void 0 ? void 0 : error.status) === 403) return /*#__PURE__*/React__default.createElement(AccessForbidden, null, t('youDontHaveAnAccessToThisDashboard'), ".", isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(Link, {
    to: routes.reports(currentUserName)
  }, t('goToMyDashboards'))));
  if ((error === null || error === void 0 ? void 0 : error.status) === 404) return /*#__PURE__*/React__default.createElement(NotFound, null, t('theDashboardYouAreRookingForCouldNotBeFound'), ' ', isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Link, {
    to: routes.reports(currentUserName)
  }, t('goToMyDashboards')), "."));
  if (!data) return /*#__PURE__*/React__default.createElement(Loader$5, null);
  const isUserOwner = currentUserName === user;
  const CardWrapComponent = isUserOwner ? DnDItem : Fragment;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$U.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: routes.reports(user)
  }, currentUserName === user ? t('backToDashboards') : t('backToDashboardsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$U.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$U.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$U.edit,
    value: data.title,
    onChange: onChangeTitle,
    readOnly: currentUserName !== data.user,
    placeholder: t('newDashboard')
  }), /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${data.private ? '' : '-open'}`
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$U.sideHeader
  }, isUserOwner && /*#__PURE__*/React__default.createElement("a", {
    className: css$U.addButton,
    onClick: toggleAddStackModal,
    href: "#"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('addStack')), renderSideHeader && renderSideHeader(), isUserOwner && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$U.dropdown,
    items: [{
      title: t('delete'),
      onClick: deleteDashboard
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$U['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), /*#__PURE__*/React__default.createElement("div", {
    className: css$U.description
  }, isShowDesc && /*#__PURE__*/React__default.createElement(StretchTextAreaField, {
    value: data.description,
    ref: descFieldRef,
    placeholder: t('description'),
    onChange: onChangeDescription,
    onBlur: onBlurDescription
  }), !isShowDesc && /*#__PURE__*/React__default.createElement(Button, {
    className: css$U.addDesc,
    color: "secondary",
    onClick: addDesc
  }, "+ ", t('addDescription'))), Boolean(items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$U.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$U.fields
  }, renderFilters())), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$U.cards)
  }, items.map(item => /*#__PURE__*/React__default.createElement(CardWrapComponent, Object.assign({
    key: item.card.stack
  }, isUserOwner ? {
    id: item.id,
    onMoveItem: moveCard
  } : {}), /*#__PURE__*/React__default.createElement(Card, {
    filters: form,
    deleteCard: isUserOwner && getDeleteCardFunc(item.card.stack),
    data: item.card,
    updateCard: isUserOwner && getUpdatedCardFunc(item.card.stack),
    moveAvailable: isUserOwner
  }))))), !items.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$U.empty
  }, t('thereAreNoStacksYet'), " ", /*#__PURE__*/React__default.createElement("br", null), t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow'), isUserOwner && /*#__PURE__*/React__default.createElement(Fragment, null, ' ', /*#__PURE__*/React__default.createElement("a", {
    className: css$U.addButton,
    onClick: toggleAddStackModal,
    href: "#"
  }, t('addStack')), ".")), /*#__PURE__*/React__default.createElement(AddStacksModal, {
    isShow: isShowStacksModal,
    onClose: toggleAddStackModal,
    onAddStacks: addStacks
  }));
};

var css$V = {"reports":"_styles-module__reports__30ROl"};

const Reports = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$V.reports
  }, /*#__PURE__*/React__default.createElement(Switch, null, /*#__PURE__*/React__default.createElement(Route, {
    path: routes.reports(),
    exact: true,
    component: List$2
  }), /*#__PURE__*/React__default.createElement(Route, {
    path: routes.reportsDetails(),
    component: Details$2
  })));
};

var logo = "logo~gyFSAwBb.svg";

var css$W = {"header":"_styles-module__header__3C4T1","logo":"_styles-module__logo__1jfuS","buttons":"_styles-module__buttons__2EQYi","button":"_styles-module__button__3cb7N"};

const Header = ({
  className
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$W.header, className)
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/",
    className: css$W.logo
  }, /*#__PURE__*/React__default.createElement("img", {
    width: "129",
    height: "35",
    src: logo,
    alt: "logo"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$W.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    Component: Link,
    to: "/auth/login",
    className: css$W.button,
    color: "primary"
  }, t('logIn'))));
};

var css$X = {"layout":"_styles-module__layout__23bi3","header":"_styles-module__header__1chFa","main":"_styles-module__main__70hee"};

const UnAuthorizedLayout = ({
  children
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$X.layout
  }, /*#__PURE__*/React__default.createElement(Header, {
    className: css$X.header
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$X.main
  }, children));
};

var css$Y = {"infoButton":"_style-module__infoButton__2zmYM"};

const SettingsInformation = ({
  className,
  renderModalContent
}) => {
  const {
    t
  } = useTranslation();
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => setIsShowModal(value => !value);

  return /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$Y.infoButton, className),
    size: "small",
    color: "secondary",
    onClick: toggleModal
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  })), renderModalContent && /*#__PURE__*/React__default.createElement(Modal, {
    withCloseButton: true,
    title: t('howToConnectYourDataWithDStack'),
    isShow: isShowModal,
    size: "big",
    onClose: toggleModal
  }, renderModalContent()));
};

export { AccessForbidden, AppStoreProvider, Avatar, BackButton, Button, CheckboxField, CodeViewer, Copy, GridContext as DnDGridContext, GridProvider as DnDGridContextProvider, DnDItem, Dropdown, FileDragnDrop$1 as FileDragnDrop, Jobs, Loader, MarkdownRender, Modal, NotFound, ProgressBar, Reports, SearchField, SelectField, SettingsInformation, SliderField, Spinner, Attachment as StackAttachment, StateProvider as StackAttachmentProvider, Details as StackDetails, StackFilters, Frames as StackFrames, HowTo as StackHowToFetchData, List as StackList, Item as StackListItem, Upload as StackUpload, StretchTextAreaField as StretchTextareaField, StretchTitleField, Tabs, TextAreaField, TextField, Tooltip, UnAuthorizedLayout, UploadStack, ViewSwitcher, Yield, apiFabric, actionsTypes as appStoreActionTypes, config, useAppStore };
//# sourceMappingURL=index.modern.js.map
