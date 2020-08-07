import React__default, { forwardRef, useState, useRef, useEffect, useCallback, createContext, useReducer, useContext, Component, memo, Fragment } from 'react';
import cx from 'classnames';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import RcTooltip from 'rc-tooltip';
import { get, isEqual, isString, debounce, unionBy } from 'lodash-es';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import { Portal } from 'react-portal';
import Select, { Option, OptGroup } from 'rc-select';
import Slider from 'rc-slider';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { parse } from 'csv-string';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
export { DndProvider } from 'react-dnd';
import { useParams } from 'react-router';

var config = {
  DOCS_URL: 'http://docs.dstack.ai',
  LOGIN_URL: '/users/login',
  VERIFY_EMAIL_URL: '/users/verify',
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
  DISCORD_URL: 'https://discord.gg/8xfhEYa',
  TWITTER_URL: 'https://twitter.com/dstackai',
  GITHUB_URL: 'https://github.com/dstackai',
  BLOG_URL: 'https://blog.dstack.ai',
  CONFIGURE_PYTHON_COMMAND: (token = '<token>', userName = '<username>') => {
    const origin = window ? window.location.origin : '';
    return `dstack config add --token ${token} --user ${userName} --server ${origin}/api`;
  },
  CONFIGURE_R_COMMAND: (token = '<token>', userName = '<username>') => {
    const origin = window ? window.location.origin : '';
    return `dstack::configure(user = "${userName}", token = "${token}", persist = "global"` + `, server = "${origin}/api")`;
  }
};

var image = require("./lock~ZBorChcU.svg");

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

var parseStackParams = (attachments => {
  const fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(i => {
    Object.keys(i.params).forEach(key => {
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

var css$9 = {"dnd":"_style-module__dnd__3uYii","file":"_style-module__file__2LG6L","fileExtend":"_style-module__fileExtend__3w6--","fileSection":"_style-module__fileSection__B8y5t","fileName":"_style-module__fileName__3Juxo","fileSize":"_style-module__fileSize__3G6N8","fileRemove":"_style-module__fileRemove__16dzP","placeholder":"_style-module__placeholder__Wr_Zp","loading":"_style-module__loading__2KndP","progressBar":"_style-module__progressBar__DHbC1","progress":"_style-module__progress__2-dth","animate-stripes":"_style-module__animate-stripes__1Iecq"};

const FileDragnDrop = ({
  formats,
  className,
  loading,
  progressPercent: _progressPercent = null,
  onChange
}) => {
  const {
    t
  } = useTranslation();
  const inputRef = useRef(null);
  const [active, setActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const isDidMount = useRef(true);
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
    className: cx(css$9.file, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileExtend
  }, ".csv"), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSection
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileName
  }, selectedFile.name), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSize
  }, formatBytes(selectedFile.size))), /*#__PURE__*/React__default.createElement("div", {
    onClick: removeFile,
    className: cx(css$9.fileRemove, 'mdi mdi-close')
  }));
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
  }, t('dragHereAFile'), '', Boolean(formats) && `(${formats.join(', ')})`, ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    onClick: onClick,
    href: "#"
  }, t('upload')), ' ', t('fromYourComputer'), "."));
};

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

var image$1 = require("./404~FXFqzVOe.svg");

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
  const ref = useRef(null);
  useEffect(() => {
    if (isActive) {
      setProgress(0);
      step.current = 0.01;
      currentProgress.current = 0;
      startCalculateProgress();
    }

    if (prevIsActive === true && isActive === false) {
      if (requestFrame.current) cancelAnimationFrame(requestFrame.current);
      setProgress(100);
      setTimeout(() => setProgress(0), 800);
    }

    if (isActive === null) {
      if (requestFrame.current) cancelAnimationFrame(requestFrame.current);
      setProgress(0);
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

  const startCalculateProgress = () => {
    requestAnimationFrame(calculateProgress);
  };

  const calculateProgress = useCallback(() => {
    currentProgress.current += step.current;
    const progress = Math.round(Math.atan(currentProgress.current) / (Math.PI / 2) * 100 * 1000) / 1000;
    setProgress(progress);
    if (progress > 70) step.current = 0.005;
    if (progress >= 100) cancelAnimationFrame(requestFrame.current);
    requestFrame.current = requestAnimationFrame(calculateProgress);
  }, [isActive]);

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
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$i.filters, className)
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
  }, value.length ? value : _placeholder));
};

var css$k = {"tabs":"_styles-module__tabs__-hQvT","tab":"_styles-module__tab__2dsXN","soon":"_styles-module__soon__2_DJa"};

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
    className: cx(css$k.tabs, className)
  }, tabs.map((i, index) => /*#__PURE__*/React__default.createElement("div", {
    key: index,
    className: cx(css$k.tab, {
      active: value === i.value
    }),
    onClick: () => onChange(i.value)
  }, i.label, i.soon && /*#__PURE__*/React__default.createElement("span", {
    className: css$k.soon
  }, t('soon')))));
};

var css$l = {"field":"_styles-module__field__3PgPN","textarea":"_styles-module__textarea__2Ok_K","label":"_styles-module__label__1qnsP","error":"_styles-module__error__1C6bH"};

const TextAreaField = ({
  label,
  className,
  size: _size = 'normal',
  errors: _errors = [],
  ...props
}) => {
  const hasErrors = Boolean(_errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$l.field, className, _size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$l.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$l.textarea
  }, /*#__PURE__*/React__default.createElement("textarea", Object.assign({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$l.error
  }, _errors.join(', '))));
};

var css$m = {"tooltip":"_style-module__tooltip__rE8Jn"};

const Tooltip = ({
  children,
  overlayContent,
  arrowContent: _arrowContent = null,
  placement: _placement = 'bottomLeft',
  trigger: _trigger = ['hover'],
  overlayStyle: _overlayStyle = {
    'pointer-events': 'none'
  },
  ...props
}) => {
  return /*#__PURE__*/React__default.createElement(RcTooltip, Object.assign({
    overlayStyle: _overlayStyle,
    arrowContent: _arrowContent,
    placement: _placement,
    trigger: _trigger,
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: css$m.tooltip
    }, overlayContent)
  }, props), children);
};

var css$n = {"switcher":"_styles-module__switcher__3NMzC"};

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
    className: cx(css$n.switcher, stateValue, className),
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
  if (children) return /*#__PURE__*/React__default.createElement(Portal, {
    node: document && document.getElementById(name)
  }, children);
  return /*#__PURE__*/React__default.createElement("div", {
    className: className,
    id: name
  });
};

var css$o = {"table":"_styles-module__table__3tMWP"};

const Table = ({
  data
}) => {
  const [captions, ...rows] = data;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$o.table
  }, /*#__PURE__*/React__default.createElement("table", null, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, captions.map(caption => /*#__PURE__*/React__default.createElement("th", {
    key: caption
  }, caption)))), /*#__PURE__*/React__default.createElement("tbody", null, rows.map((row, index) => /*#__PURE__*/React__default.createElement("tr", {
    key: index
  }, row.map((cell, i) => /*#__PURE__*/React__default.createElement("td", {
    key: i
  }, cell)))))));
};

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

var actionsTypes = {
  FETCH: 'stacks/attachments/FETCH',
  FETCH_SUCCESS: 'stacks/attachments/FETCH_SUCCESS',
  FETCH_FAIL: 'stacks/attachments/FETCH_FAIL'
};

const initialState = {
  data: {},
  errors: {},
  requestStatus: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH:
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

    case actionsTypes.FETCH_SUCCESS:
      return { ...state,
        data: { ...state.data,
          [action.meta.frameId]: { ...state.data[action.meta.frameId],
            [action.meta.id]: { ...action.payload,
              loading: false
            }
          }
        }
      };

    case actionsTypes.FETCH_FAIL:
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
const StateContext = createContext();
const StateProvider = ({
  children,
  apiUrl
}) => /*#__PURE__*/React__default.createElement(StateContext.Provider, {
  value: useReducer(reducer, { ...initialState,
    apiUrl
  })
}, children);
const useStateValue = () => useContext(StateContext);

var actions = (() => {
  const [{
    apiUrl
  }, dispatch] = useStateValue();

  const fetchAttachment = async (stack, frameId, id, onSuccess) => {
    dispatch({
      type: actionsTypes.FETCH,
      meta: {
        frameId,
        id
      }
    });

    try {
      const request = await axios({
        baseURL: apiUrl,
        url: config.STACK_ATTACHMENT(stack, frameId, id)
      });
      dispatch({
        type: actionsTypes.FETCH_SUCCESS,
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
        type: actionsTypes.FETCH_FAIL,
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

var css$p = {"attachment":"_styles-module__attachment__3NILI","loading-pulse":"_styles-module__loading-pulse__IhCO3","view":"_styles-module__view__3UWqG","text":"_styles-module__text__MOcaD","message":"_styles-module__message__1IDQc"};

const base64ToJSON = base64 => {
  let parsedJSON;

  try {
    parsedJSON = JSON.parse(atob(base64));
  } catch (e) {
    console.log(e);
  }

  return parsedJSON;
};

const base64ImagePrefixes = {
  'image/svg+xml': 'data:image/svg+xml;charset=utf-8;',
  'image/png': 'data:image/png;charset=utf-8;',
  'image/jpeg': 'data:image/jpeg;charset=utf-8;'
};

const isImageType = type => /^image/.test(type);

const Attachment = ({
  id,
  className,
  frameId,
  isList,
  withLoader,
  stack
}) => {
  const {
    t
  } = useTranslation();
  const {
    fetchAttachment
  } = actions();
  const [{
    data,
    apiUrl
  }] = useStateValue();
  const {
    loading,
    error,
    requestStatus,
    ...attachment
  } = get(data, `${frameId}.${id}`, {});
  const [tableScale, setTableScale] = useState(1);
  const [loadingFullAttachment, setLoadingFullAttachment] = useState(false);
  const [fullAttachment, setFullAttachment] = useState(null);
  const viewRef = useRef(null);
  const prevAttachment = usePrevious(attachment);
  useEffect(() => {
    if (window && isList) window.addEventListener('resize', onResizeCard);
    return () => {
      if (window && isList) window.removeEventListener('resize', onResizeCard);
    };
  }, []);

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
  useEffect(() => {
    if (attachment && attachment['application'] === 'bokeh' && Bokeh) {
      const json = base64ToJSON(attachment.data);
      if (json && document.querySelector(`#bokeh-${frameId}`)) Bokeh.embed.embed_item(json, `bokeh-${frameId}`);
    }

    if (isList) setTimeout(() => onResizeCard(), 10);
  }, [data]);

  const onResizeCard = () => {
    if (ref.current && viewRef.current) {
      const containerWidth = ref.current.offsetWidth;
      const viewWidth = viewRef.current.offsetWidth / tableScale;
      let newScale = containerWidth / viewWidth;
      if (newScale > 1) newScale = 1;
      setTableScale(newScale);
    }
  };

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
      className: css$p.text
    }, t('notSupportedAttachment'));
  };

  const renderPlotly = () => {
    const json = base64ToJSON(attachment.data);
    if (!json) return null;
    json.layout.width = '100%';
    json.layout.margin = 0;
    json.layout.autosize = true;
    json.config = {
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
    if (loading) return null;
    if (requestStatus === 404 && isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.message
    }, t('notFound'));
    if (requestStatus === 404 && !isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.text
    }, t('noPreview'));
    if (attachment.preview && isList && isImageType(attachment['content_type'])) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.message
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
        return null;

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: isList ? css$p.message : css$p.text
        }, t('notSupportedAttachment'));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$p.attachment, className, {
      'is-list': isList,
      loading: loading && withLoader || loadingFullAttachment
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: viewRef,
    className: cx(css$p.view, {
      'table': attachment && attachment.data && attachment['content_type'] === 'text/csv',
      'bokeh': attachment && attachment.data && attachment['application'] === 'bokeh'
    }),
    style: attachment && attachment['content_type'] === 'text/csv' ? {
      transform: `scale(${tableScale})`
    } : {}
  }, renderAttachment()));
};

var css$q = {"item":"_styles-module__item__fLtf5","preview":"_styles-module__preview__2dbXz","previewWrap":"_styles-module__previewWrap__2tToy","emptyMessage":"_styles-module__emptyMessage__3HPC2","attachment":"_styles-module__attachment__2ggOS","section":"_styles-module__section__1ugjv","content":"_styles-module__content__2S1Sc","name":"_styles-module__name__147V3","by":"_styles-module__by__3t2iA","permissions":"_styles-module__permissions__2SUP0","dropdown":"_styles-module__dropdown__35FwM","preview-stack-pulse":"_styles-module__preview-stack-pulse__YESUl"};

const Item = ({
  Component: _Component = 'div',
  onClick,
  data,
  deleteAction,
  otherOwner,
  ...rest
}) => {
  const {
    t
  } = useTranslation();
  const ref = useRef(null);
  return /*#__PURE__*/React__default.createElement(_Component, Object.assign({
    className: css$q.item,
    ref: ref,
    onClick: onClick
  }, rest), /*#__PURE__*/React__default.createElement("div", {
    className: css$q.previewWrap
  }, data.head ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$q.attachment,
    isList: true,
    withLoader: true,
    stack: `${data.user}/${data.name}`,
    frameId: data.head,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$q.emptyMessage
  }, t('emptyStack'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$q.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$q.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$q.name
  }, data.name, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${data.private ? '' : '-open'}`
  })), otherOwner && /*#__PURE__*/React__default.createElement("div", {
    className: css$q.by
  }, t('by'), " ", data.user)), deleteAction && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$q.dropdown,
    items: [{
      title: t('delete'),
      onClick: () => deleteAction(data.name)
    }]
  })));
};

var css$r = {"howto":"_styles-module__howto__2kGrG","tabs":"_styles-module__tabs__RLKw7","description":"_styles-module__description__3Ul2-","code":"_styles-module__code__11v2r","footer":"_styles-module__footer__nTy2P"};

const reportPlotPythonCode = `import matplotlib.pyplot as plt
from dstack import push_frame

fig = plt.figure()
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])

push_frame("simple", fig, "My first plot")`;
const installRPackageCode = 'install.packages("dstack")';
const reportPlotRCode = `library(ggplot2)
library(dstack)

df <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))
image <- ggplot(data = df, aes(x = x, y = y)) + geom_line()

push_frame("simple", image, "My first plot")`;

const HowTo = ({
  user,
  token
}) => {
  const {
    t
  } = useTranslation();
  const [activeCodeTab, setActiveCodeTab] = useState(1);
  const [activePlatformTab, setActivePlatformTab] = useState(1);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$r.howto
  }, /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, config.CONFIGURE_PYTHON_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "python"
  }, reportPlotPythonCode)), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, installRPackageCode), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, config.CONFIGURE_R_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, reportPlotRCode)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks', {
        href: config.DOCS_URL
      })
    }
  }));
};

var css$s = {"list":"_styles-module__list__3CcWo","title":"_styles-module__title__2HbVV","side":"_styles-module__side__I1N48","message":"_styles-module__message__3XJKG","text":"_styles-module__text__1_wO5","grid":"_styles-module__grid__1BjLa","search":"_styles-module__search__3VlZv","mobileSearch":"_styles-module__mobileSearch__IxVfV","modal":"_styles-module__modal__1BJIQ","description":"_styles-module__description__1U-iN","buttons":"_styles-module__buttons__19NkE","button":"_styles-module__button__3jLaw"};

const List = ({
  data: _data = [],
  loading,
  deleteStack,
  currentUser,
  user,
  currentUserToken,
  renderSideTitle
}) => {
  const {
    t
  } = useTranslation();
  const [deletingStack, setDeletingStack] = useState(null);
  const [isShowWelcomeModal, setIsShowWelcomeModal] = useState(false);
  const [isShowHowToModal, setIsShowHowToModal] = useState(false);
  const [search, setSearch] = useState('');
  const isInitialMount = useRef(true);

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

  const showHowToModal = event => {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  const hideHowToModal = () => setIsShowHowToModal(false);

  const deleteItem = () => {
    deleteStack(deletingStack);
    hideDeleteConfirmation();
  };

  const showDeleteConfirmation = name => setDeletingStack(name);

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
    className: css$s.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$s.search,
    placeholder: t('findStack'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.title
  }, currentUser === user ? t('stacks') : t('stacksOf', {
    name: user
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.side
  }, renderSideTitle && renderSideTitle())), loading && !Boolean(_data.length) && /*#__PURE__*/React__default.createElement(Loader, null), !loading && !_data.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: user
  })), !loading && !Boolean(_data.length) && currentUser === user && /*#__PURE__*/React__default.createElement(HowTo, {
    user: currentUser,
    token: currentUserToken
  }), Boolean(_data.length && items.length) && currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.text
  }, t('youHaveStacks', {
    count: _data.length
  }), ' ', /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('seeHowToGuide')), "."), Boolean(_data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$s.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), Boolean(_data.length && items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.grid
  }, items.map((item, index) => /*#__PURE__*/React__default.createElement(Item, {
    Component: Link,
    key: index,
    data: item,
    otherOwner: user !== item.user,
    to: `/${item.user}/${item.name}`,
    deleteAction: currentUser === item.user && showDeleteConfirmation
  }))), Boolean(_data.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(deletingStack),
    onClose: hideDeleteConfirmation,
    size: "confirmation",
    title: t('deleteStack'),
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.description
  }, t('areYouSureYouWantToDelete', {
    name: deletingStack
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideDeleteConfirmation,
    className: css$s.button
  }, t('cancel')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: deleteItem,
    className: css$s.button
  }, t('deleteStack')))), currentUser === user && /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowWelcomeModal,
    onClose: hideWelcomeModal,
    size: "small",
    title: `${t('welcomeToDStack')}👋`,
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.description
  }, t('yourEmailWasSuccessfullyConfirmed')), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideWelcomeModal,
    className: css$s.button
  }, t('getStarted')))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToConnectYourDataWithDStack'),
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement(HowTo, {
    user: currentUser,
    token: currentUserToken,
    modalMode: true
  })));
};

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
from dstack import pull

df = pd.read_csv(pull(${a.join(', ')}))`;
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

const HowTo$1 = ({
  modalMode,
  user,
  token,
  data
}) => {
  const {
    t
  } = useTranslation();
  const [activeCodeTab, setActiveCodeTab] = useState(1);
  const [activePlatformTab, setActivePlatformTab] = useState(1);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$r.howto
  }, !modalMode && /*#__PURE__*/React__default.createElement("div", {
    className: css$r.title
  }, t('howToFetchDataUsingTheAPI')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, config.CONFIGURE_PYTHON_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "python"
  }, pullPythonCode(data))), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, "install.packages(\"dstack\")"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, config.CONFIGURE_R_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, pullRCode(data))), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.footer,
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

var css$t = {"frames":"_styles-module__frames__3D3R4","frames-dropdown":"_styles-module__frames-dropdown__3hapH","button":"_styles-module__button__Tn4o_","name":"_styles-module__name__YzOn7","label":"_styles-module__label__Hg7hs","dropdown":"_styles-module__dropdown__16pcp","item":"_styles-module__item__1q46l","mark":"_styles-module__mark__1h8Eq","info":"_styles-module__info__2BnTD","modal":"_styles-module__modal__pk61B","description":"_styles-module__description__2GOOp","buttons":"_styles-module__buttons__3Ml-A"};

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
    className: cx(css$t.frames, className),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t['frames-dropdown']),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.button,
    onClick: toggleDropdown
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$t.name
  }, getFrameName(activeFrame)), headId === activeFrame.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$t.label
  }, t('head')), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.dropdown, {
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
    className: css$t.item
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$t.name
  }, getFrameName(f)), headId === f.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$t.label
  }, t('head')), headId !== f.id && /*#__PURE__*/React__default.createElement("div", {
    className: css$t.mark,
    onClick: onClickMarkAsHead(f)
  }, t('markAsHead'))))))), activeFrame && activeFrame.description && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: activeFrame.description
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.info)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-variant"
  }))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(frameForMarkingAsHead),
    onClose: hideConfirmation,
    size: "confirmation",
    title: t('changeHeadRevision'),
    className: css$t.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('areYouSureYouWantToChangeTheCurrentHeadRevisionToByName', {
    frame: frameForMarkingAsHead && getFrameName(frameForMarkingAsHead)
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: confirmMarkFrameAsHead,
    className: css$t.button
  }, t('yesChangeHead')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: hideConfirmation,
    className: css$t.button
  }, t('cancel')))));
};

var css$u = {"loader":"_styles-module__loader__2wNmt","title":"_styles-module__title__1Ms-2","stacks-pulse":"_styles-module__stacks-pulse__FjfKI","label":"_styles-module__label__1rFaq","description":"_styles-module__description__1Rg_O","diagram":"_styles-module__diagram__2Aj7C"};

const Loader$1 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$u.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.label
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.diagram
  }));
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

var css$v = {"details":"_styles-module__details__3iAZb","section":"_styles-module__section___r9FQ","header":"_styles-module__header__2kekg","title":"_styles-module__title__1zGvd","permissions":"_styles-module__permissions__3ydGO","copy":"_styles-module__copy__2ikHm","link":"_styles-module__link__21w9U","dropdown":"_styles-module__dropdown__3axDI","attachment-head":"_styles-module__attachment-head__282UU","description":"_styles-module__description__Y6gJz","label":"_styles-module__label__2FemD","label-tooltip":"_styles-module__label-tooltip__2Oe5S","actions":"_styles-module__actions__sZkKa","size":"_styles-module__size__Ja107","revisions":"_styles-module__revisions__bLqAO","filters":"_styles-module__filters__1-hdZ","attachment":"_styles-module__attachment__3IGZo","sidebar":"_styles-module__sidebar__U0_wY","modal":"_styles-module__modal__2TdJX","buttons":"_styles-module__buttons__RhHmq","button":"_styles-module__button__26mqa"};

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
  currentUserToken,
  toggleUpload,
  backUrl,
  user,
  stack
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
  const [fields, setFields] = useState({});
  const prevFrame = usePrevious(frame);
  const [isShowHowToModal, setIsShowHowToModal] = useState(false);

  const showHowToModal = event => {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  const hideHowToModal = () => setIsShowHowToModal(false);

  useEffect(() => {
    if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame) parseParams();
  }, [frame]);

  const findAttach = (form, attachmentIndex) => {
    const attachments = get(frame, 'attachments');
    const fields = Object.keys(form);
    if (!attachments) return;

    if (fields.length) {
      attachments.some((attach, index) => {
        let valid = true;
        fields.forEach(key => {
          if (!attach.params || !isEqual(attach.params[key], form[key])) valid = false;
        });
        if (valid && !(attachmentIndex === undefined && index === 0)) onChangeAttachmentIndex(index);
        return valid;
      });
    }
  };

  const findAttachDebounce = useCallback(debounce(findAttach, 300), [data, frame]);
  useEffect(() => {
    if (didMountRef.current) findAttachDebounce(form, attachmentIndex);else didMountRef.current = true;
  }, [form]);

  const parseParams = () => {
    const attachments = get(frame, 'attachments');
    if (!attachments || !attachments.length) return;
    const fields = parseStackParams(attachments);
    setFields(fields);

    if (attachmentIndex !== undefined) {
      if (attachments[attachmentIndex]) setForm(attachments[attachmentIndex].params);
    } else setForm(attachments[0].params);
  };

  const renderFields = () => {
    if (!Object.keys(fields).length) return null;
    const hasSelectField = Object.keys(fields).some(key => fields[key].type === 'select');
    return /*#__PURE__*/React__default.createElement(StackFilters, {
      fields: fields,
      form: form,
      onChange: onChange,
      className: cx(css$v.filters, {
        'with-select': hasSelectField
      })
    });
  };

  const onClickDownloadAttachment = event => {
    event.preventDefault();
    downloadAttachment();
  };

  const attachment = get(frame, `attachments[${attachmentIndex}]`);
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$1, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$v.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToMyStacks') : t('backToStacksOF', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("section", {
    className: css$v.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.title
  }, data.name, /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${data.private ? '' : '-open'}`
  })), data && data.user === currentUser && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$v.dropdown,
    items: [{
      title: t('upload'),
      onClick: toggleUpload
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$v['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  })))), /*#__PURE__*/React__default.createElement(Frames, {
    frames: get(data, 'frames', []),
    frame: currentFrameId,
    headId: headId,
    onMarkAsHead: onChangeHeadFrame,
    onChange: onChangeFrame,
    className: css$v.revisions
  }), renderFields(), attachment && /*#__PURE__*/React__default.createElement("div", {
    className: css$v['attachment-head']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.description
  }, attachment.description && /*#__PURE__*/React__default.createElement(MarkdownRender, {
    source: attachment.description
  })), attachment['content_type'] === 'text/csv' && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.actions
  }, attachment.preview && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.label
  }, t('preview'), /*#__PURE__*/React__default.createElement("div", {
    className: css$v['label-tooltip']
  }, t('theTableBelowShowsOnlyAPreview'))), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('useThisStackViaAPI')), /*#__PURE__*/React__default.createElement("span", null, t('or')), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickDownloadAttachment
  }, t('download')), attachment.length && /*#__PURE__*/React__default.createElement("span", {
    className: css$v.size
  }, "(", formatBytes(attachment.length), ")"))), frame && /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$v.attachment,
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
    className: css$v.modal
  }, /*#__PURE__*/React__default.createElement(HowTo$1, {
    user: currentUser,
    token: currentUserToken,
    data: {
      stack: `${user}/${stack}`,
      params: form
    },
    modalMode: true
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

var css$w = {"loader":"_styles-module__loader__2RpBO","text":"_styles-module__text__3gk1Z","dashboards-details-pulse":"_styles-module__dashboards-details-pulse__3HZ82","filters":"_styles-module__filters__3ZZJL","grid":"_styles-module__grid__ZafPr","item":"_styles-module__item__LIYeR"};

const Loader$2 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$w.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.filters
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.item
  })));
};

var useDebounce = ((callback, depsOrDelay, deps) => {
  let delay = 300;
  if (typeof depsOrDelay === 'number') delay = depsOrDelay;else deps = depsOrDelay;
  return useCallback(debounce(callback, delay), deps);
});

var css$x = {"card":"_styles-module__card__17jo7","inner":"_styles-module__inner__YLuSm","head":"_styles-module__head__2dKop","name":"_styles-module__name__1blF_","nameEdit":"_styles-module__nameEdit__3omHN","nameValue":"_styles-module__nameValue__wx2sM","info":"_styles-module__info__1Tbhc","dropdown":"_styles-module__dropdown__1NvWp","button":"_styles-module__button__d6fLT","move":"_styles-module__move__312qk","link":"_styles-module__link__NfDp4","infoTime":"_styles-module__infoTime__2QMrW","emptyMessage":"_styles-module__emptyMessage__7aBhX","attachment":"_styles-module__attachment__2ajkc"};

const Card = memo(({
  data,
  className,
  type: _type = 'grid',
  deleteCard,
  updateCardTitle,
  filters,
  forwardedRef,
  moveAvailable
}) => {
  const [title, setTitle] = useState(data.title);
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

  const onUpdate = updateCardTitle ? useDebounce(updateCardTitle, []) : () => {};

  const onChangeTitle = event => {
    setTitle(event.target.value);
    onUpdate(event.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$x.card, `type-${_type}`, className),
    ref: forwardedRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.inner
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.head
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$x.name, {
      readonly: !updateCardTitle
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.nameValue
  }, title.length ? title : t('title')), /*#__PURE__*/React__default.createElement("input", {
    value: title,
    type: "text",
    placeholder: t('title'),
    onChange: onChangeTitle,
    className: cx(css$x.nameEdit, {
      active: !title.length
    })
  })), /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", null, t('updatedByName', {
      name: stackOwner
    })), data.head && /*#__PURE__*/React__default.createElement("div", {
      className: css$x.infoTime
    }, moment(data.head.timestamp).format('D MMM YYYY')))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.info
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  }))), /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$x.button, css$x.link),
    color: "secondary",
    Component: Link,
    to: `/${data.stack}`
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), Boolean(deleteCard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$x.dropdown,
    items: [...(deleteCard ? [{
      title: t('delete'),
      onClick: deleteCard
    }] : [])]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$x.button,
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))), moveAvailable && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$x.button, css$x.move),
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-cursor-move"
  }))), headId ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$x.attachment,
    isList: true,
    withLoader: true,
    stack: data.stack,
    frameId: headId,
    id: attachmentIndex
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$x.emptyMessage
  }, t('emptyDashboard'))));
});

var css$y = {"details":"_styles-module__details__2U9YD","header":"_styles-module__header__2Lioj","title":"_styles-module__title__353_b","edit":"_styles-module__edit__14H-Y","permissions":"_styles-module__permissions__1up3B","dropdown":"_styles-module__dropdown__1OYBD","section":"_styles-module__section__3ZM3A","cards":"_styles-module__cards__2idlU","fields":"_styles-module__fields__3zxn3","filters":"_styles-module__filters__QjWiF","controls":"_styles-module__controls__9DqNJ","addButton":"_styles-module__addButton__ezy69","viewSwitcher":"_styles-module__viewSwitcher__2LheQ","empty":"_styles-module__empty__j9SPi"};

const Details$1 = ({
  addCards,
  backUrl,
  cards,
  currentUser,
  data,
  deleteCard,
  deleteDashboard,
  loading,
  onChangeTitle,
  updateCard,
  user,
  withSorting
}) => {
  const {
    items,
    moveItem,
    setItems
  } = useContext(GridContext);
  const {
    t
  } = useTranslation();
  const [view, setView] = useState('grid');
  const {
    form,
    setForm,
    onChange
  } = useForm({});
  const [fields, setFields] = useState({});
  const prevData = usePrevious(data);
  const isDidMount = useRef(true);
  const onChangeTitleDebounce = useCallback(debounce(onChangeTitle, 300), []);

  const setGridItems = cardsItems => setItems(cardsItems.map(card => ({
    id: card.index,
    card
  })));

  useEffect(() => {
    if (window) window.dispatchEvent(new Event('resize'));
  }, [view]);
  useEffect(() => {
    if (cards) setGridItems(cards);
    return () => setGridItems([]);
  }, [cards]);
  useEffect(() => {
    if ((!isEqual(prevData, data) || isDidMount.current) && data) parseParams();
    if (isDidMount.current) isDidMount.current = false;
  }, [data]);

  const moveCard = (indexFrom, indexTo) => {
    if (indexTo < 0 || indexFrom < 0) return;
    const {
      stack
    } = items[indexFrom].card;
    updateCard({
      stack,
      index: indexTo
    });
    moveItem(indexFrom, indexTo);
  };

  const getDeleteCardAction = stack => {
    if (deleteCard) {
      return () => {
        deleteCard(stack);
      };
    }
  };

  const getUpdateCardTitleAction = stack => {
    if (updateCard) return title => {
      updateCard({
        stack,
        title
      });
    };
  };

  const parseParams = () => {
    if (!cards) return;
    const fields = cards.reduce((result, card) => {
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

  const renderFilters = () => {
    if (!Object.keys(fields).length) return null;
    const hasSelectField = Object.keys(fields).some(key => fields[key].type === 'select');
    return /*#__PURE__*/React__default.createElement(StackFilters, {
      fields: fields,
      form: form,
      onChange: onChange,
      className: cx(css$y.filters, {
        'with-select': hasSelectField
      })
    });
  };

  const getAddClickAction = () => {
    if (addCards) return event => {
      event.preventDefault();
      addCards();
    };
  };

  if (loading) return /*#__PURE__*/React__default.createElement(Loader$2, null);
  if (!data) return null;
  const CardWrapComponent = withSorting ? DnDItem : Fragment;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$y.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToDashboards') : t('backToDashboardsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$y.edit,
    value: data === null || data === void 0 ? void 0 : data.title,
    onChange: onChangeTitleDebounce,
    readOnly: currentUser !== data.user,
    placeholder: t('newDashboard')
  }), /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${data.private ? '' : '-open'}`
  })), Boolean(deleteDashboard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$y.dropdown,
    items: [...(Boolean(deleteDashboard) ? [{
      title: t('delete'),
      onClick: deleteDashboard
    }] : [])]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$y['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  })))), Boolean(items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.fields
  }, renderFilters()), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.controls
  }, getAddClickAction() && /*#__PURE__*/React__default.createElement("a", {
    className: css$y.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('addStack')), /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    value: view,
    className: css$y.viewSwitcher,
    onChange: view => setView(view)
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$y.cards, view)
  }, items.map(item => /*#__PURE__*/React__default.createElement(CardWrapComponent, Object.assign({
    key: item.card.stack
  }, withSorting ? {
    id: item.id,
    onMoveItem: moveCard
  } : {}), /*#__PURE__*/React__default.createElement(Card, {
    filters: form,
    deleteCard: getDeleteCardAction(item.card.stack),
    data: item.card,
    type: view,
    updateCardTitle: getUpdateCardTitleAction(item.card.stack),
    moveAvailable: withSorting
  }))))), !items.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$y.empty
  }, t('thereAreNoStacksYet'), " ", /*#__PURE__*/React__default.createElement("br", null), t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow'), getAddClickAction() && /*#__PURE__*/React__default.createElement(Fragment, null, ' ', /*#__PURE__*/React__default.createElement("a", {
    className: css$y.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, t('addStack')), ".")));
};

var css$z = {"item":"_styles-module__item__3urCL","preview":"_styles-module__preview__cxR4e","label":"_styles-module__label__tCzQe","previewWrap":"_styles-module__previewWrap__15fuU","emptyMessage":"_styles-module__emptyMessage__2pDKf","attachment":"_styles-module__attachment__35KB8","section":"_styles-module__section__LeHWu","content":"_styles-module__content__Bgbe4","name":"_styles-module__name__2PrtI","by":"_styles-module__by__1_qsJ","permissions":"_styles-module__permissions__3ZdE1","dropdown":"_styles-module__dropdown__vK4SD","preview-stack-pulse":"_styles-module__preview-stack-pulse__3NFJT"};

const Item$1 = ({
  dashboard,
  deleteDashboard,
  user
}) => {
  const {
    t
  } = useTranslation();
  const ref = useRef(null);
  const hasStacks = dashboard.cards && Boolean(dashboard.cards.length);
  const card = dashboard.cards.find(c => get(c, 'head.id'));

  const onClickDelete = () => {
    deleteDashboard({
      user: user,
      id: dashboard.id
    });
  };

  const isShowDropdown = Boolean(deleteDashboard);
  return /*#__PURE__*/React__default.createElement(Link, {
    to: `/${user}/d/${dashboard.id}`,
    className: css$z.item,
    ref: ref
  }, Boolean(dashboard.cards.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$z.label
  }, t('stacksWithCount', {
    count: dashboard.cards.length
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.previewWrap
  }, hasStacks ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$z.attachment,
    isList: true,
    withLoader: true,
    frameId: card.head.id,
    stack: card.stack,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$z.emptyMessage
  }, t('emptyDashboard'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.name
  }, dashboard.title, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: `mdi mdi-lock${dashboard.private ? '' : '-open'}`
  })), user !== dashboard.user && /*#__PURE__*/React__default.createElement("div", {
    className: css$z.by
  }, t('by'), " ", dashboard.user)), isShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$z.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  })));
};

var css$A = {"loader":"_styles-module__loader__PK0JP","text":"_styles-module__text__1F-rx","dashboards-pulse":"_styles-module__dashboards-pulse__29IbF","grid":"_styles-module__grid__ef-jq","item":"_styles-module__item__1HBd8","pic":"_styles-module__pic__1z0LR","section":"_styles-module__section__14O5G"};

const Loader$3 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$A.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.section
  }))));
};

var css$B = {"list":"_styles-module__list__2tGd9","title":"_styles-module__title__lNufF","search":"_styles-module__search__3Vnt-","mobileSearch":"_styles-module__mobileSearch__28J_R","text":"_styles-module__text__2QiEZ","grid":"_styles-module__grid__31LQw","add":"_styles-module__add__1VMC5","caption":"_styles-module__caption__pTzl3"};

const List$1 = ({
  addDashboard,
  addDashboardDisable,
  currentUser,
  data,
  deleteDashboard,
  loading,
  user
}) => {
  const [search, setSearch] = useState('');
  const {
    t
  } = useTranslation();

  const onChangeSearch = value => setSearch(value);

  const getItems = () => {
    let items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(i => i.title.indexOf(search) >= 0);else items = data;
    }

    return items;
  };

  const items = getItems();
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$3, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$B.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$B.search,
    placeholder: t('findDashboard'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.title
  }, currentUser === user ? t('myDashboards') : t('dashboardsOf', {
    name: user
  }), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("span", null, data.length)), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$B.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.grid
  }, currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    onClick: addDashboard,
    className: cx(css$B.add, {
      disabled: addDashboardDisable
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.caption
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('newDashboard'))), items.map((item, index) => /*#__PURE__*/React__default.createElement(Item$1, {
    key: index,
    user: user,
    dashboard: item,
    deleteDashboard: currentUser === item.user && deleteDashboard
  }))));
};

var css$C = {"loader":"_styles-module__loader__FMgKh","text":"_styles-module__text__3kMB4","stacks-pulse":"_styles-module__stacks-pulse__2uZ4b","grid":"_styles-module__grid__1i-Vy","item":"_styles-module__item__3Q6le","pic":"_styles-module__pic__2gd5L","section":"_styles-module__section__BzTYi"};

const Loader$4 = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$C.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.section
  }))));
};

var css$D = {"stacks":"_style-module__stacks__1YlOe","grid":"_style-module__grid__2Xblj","search":"_style-module__search__2JDJR","message":"_style-module__message__30aty","text":"_style-module__text__1qJHA","item":"_style-module__item__1AIvq","checkbox":"_style-module__checkbox__I8MzQ","buttons":"_style-module__buttons__3uEfC","button":"_style-module__button__22J0P"};

const AddStacksModal = ({
  stacks: _stacks = [],
  loading,
  isShow,
  onClose,
  onAddStacks,
  currentUser,
  user
}) => {
  const {
    t
  } = useTranslation();
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    if (!isShow) {
      setSelected([]);
      setSearchQuery('');
    }
  }, [isShow]);

  const getItems = () => {
    let items = [];

    if (_stacks && _stacks.length) {
      if (searchQuery.length) items = _stacks.filter(i => i.name.indexOf(searchQuery) >= 0);else items = _stacks;
    }

    return items;
  };

  const items = getItems();

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

  return /*#__PURE__*/React__default.createElement(Modal, {
    dialogClassName: css$D.stacks,
    isShow: isShow,
    title: t('selectStacks'),
    onClose: onClose,
    withCloseButton: true
  }, !loading && Boolean(_stacks.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$D.search,
    isDark: true,
    size: "middle",
    showEverything: true,
    placeholder: t('findStack'),
    value: searchQuery,
    onChange: onChangeSearch
  }), loading && /*#__PURE__*/React__default.createElement(Loader$4, null), !loading && !_stacks.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$D.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: params.user
  })), !loading && Boolean(_stacks.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$D.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), !loading && Boolean(_stacks.length && items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.grid
  }, items.map((item, index) => /*#__PURE__*/React__default.createElement("div", {
    className: css$D.item,
    key: index,
    onClick: getOnClickStack(item)
  }, /*#__PURE__*/React__default.createElement(CheckboxField, {
    className: css$D.checkbox,
    value: isChecked(item),
    readOnly: true
  }), /*#__PURE__*/React__default.createElement(Item, {
    data: item,
    otherOwner: params.user !== item.user
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$D.button,
    color: "primary",
    variant: "contained",
    disabled: !selected.length,
    onClick: submit
  }, t('addSelectedStacks')), /*#__PURE__*/React__default.createElement(Button, {
    className: css$D.button,
    color: "secondary",
    variant: "contained",
    onClick: onClose
  }, t('cancel')))));
};

export { AccessForbidden, Avatar, BackButton, Button, CheckboxField, CodeViewer, Copy, AddStacksModal as DashboardAddStacksModal, Details$1 as DashboardDetails, List$1 as DashboardList, Item$1 as DashboardListItem, GridContext as DnDGridContext, GridProvider as DnDGridContextProvider, DnDItem, Dropdown, FileDragnDrop, Loader, MarkdownRender, Modal, NotFound, ProgressBar, SearchField, SelectField, SliderField, Spinner, Attachment as StackAttachment, StateProvider as StackAttachmentProvider, Details as StackDetails, StackFilters, Frames as StackFrames, HowTo as StackHowTo, HowTo$1 as StackHowToFetchData, List as StackList, Item as StackListItem, StretchTitleField, Tabs, TextAreaField, TextField, Tooltip, ViewSwitcher, Yield, config };
//# sourceMappingURL=index.modern.js.map
