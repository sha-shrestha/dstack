import React__default, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import cx from 'classnames';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import RcTooltip from 'rc-tooltip';
import 'lodash-es';
import 'moment';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import { Portal } from 'react-portal';
import Select, { Option, OptGroup } from 'rc-select';
import Slider from 'rc-slider';

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

var css$2 = {"button":"_style-module__button__2lKoS","spinner":"_style-module__spinner__31PPt"};

var css$3 = {"spinner":"_styles-module__spinner__3XhrC","spinner-animation":"_styles-module__spinner-animation__2UA3s"};

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
    className: cx(css$3.spinner, className, align, {
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
    className: cx(css$2.button, _size, `color-${_color}`, `variant-${_variant}`, className, {
      'full-width': _fullWidth
    })
  }, props), isShowSpinner && /*#__PURE__*/React__default.createElement(Spinner, {
    className: css$2.spinner,
    color: "white",
    isShown: true
  }), children);
});

var css$4 = {"checkbox":"_styles-module__checkbox__3lqFk","toggle-label":"_styles-module__toggle-label__1aLAG","label":"_styles-module__label__2PZb-","wrapper":"_styles-module__wrapper__2Vufp","mark":"_styles-module__mark__2Pb2f"};

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
    className: cx(css$4.checkbox, className, _appearance, _align, {
      disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("input", Object.assign({
    type: "checkbox",
    checked: value
  }, props)), offLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$4['toggle-label'], 'off'),
    dangerouslySetInnerHTML: {
      __html: offLabel
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$4.wrapper
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$4.mark, 'mdi', 'mdi-check', {
      'toggle-color': !(onLabel && offLabel)
    })
  })), onLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$4['toggle-label'], 'on'),
    dangerouslySetInnerHTML: {
      __html: onLabel
    }
  }), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$4.label
  }, label)), children);
};

var css$5 = {"copy":"_styles-module__copy__3J5hd","message":"_styles-module__message__3RWnQ","button":"_styles-module__button__2YqEb","icon":"_styles-module__icon__25GMO"};

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
    className: cx(css$5.copy, className)
  }, children ? children({
    onClick: onCLick
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$5.button,
    onClick: onCLick
  }, /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5.icon, 'mdi mdi-content-copy')
  }), buttonTitle ? buttonTitle : t('copy')), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$5.message, {
      'is-show': isShowMessage
    })
  }, successMessage ? successMessage : t('copied')));
};

var css$6 = {"code":"_styles-module__code__3gARj","copy":"_styles-module__copy__m44gX","icon":"_styles-module__icon__ZmZbg"};

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
    className: cx(css$6.code, className, fontSize && `font-size-${fontSize}`)
  }, /*#__PURE__*/React__default.createElement(Highlight, {
    language: language
  }, children), /*#__PURE__*/React__default.createElement(Copy, {
    className: css$6.copy,
    copyText: children,
    successMessage: t('snippetIsCopied')
  }));
};

var css$7 = {"dropdown":"_styles-module__dropdown__1qRCw","button":"_styles-module__button__fzNEm","menu":"_styles-module__menu__AJ1Y3","item":"_styles-module__item__3lbfY"};

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
    className: cx(css$7.dropdown, className, {
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
      className: cx(css$7.menu, 'show'),
      ref: dropdownRef,
      onClick: clickStopPropagation
    }, items.map((i, index) => /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: css$7.item,
      onClick: onCLickItem(i)
    }, i.title)))
  }, children ? React__default.cloneElement(children, {
    onClick: onCLickButton,
    ref: buttonRef
  }) : /*#__PURE__*/React__default.createElement("div", {
    ref: buttonRef,
    className: cx(css$7.button, buttonClassName),
    onClick: onCLickButton
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-vertical"
  }))));
};

const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes';
  let k = 1024;
  let dm = decimals <= 0 ? 0 : decimals || 2;
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

var css$8 = {"dnd":"_style-module__dnd__3uYii","file":"_style-module__file__2LG6L","fileExtend":"_style-module__fileExtend__3w6--","fileSection":"_style-module__fileSection__B8y5t","fileName":"_style-module__fileName__3Juxo","fileSize":"_style-module__fileSize__3G6N8","fileRemove":"_style-module__fileRemove__16dzP","placeholder":"_style-module__placeholder__Wr_Zp","loading":"_style-module__loading__2KndP","progressBar":"_style-module__progressBar__DHbC1","progress":"_style-module__progress__2-dth","animate-stripes":"_style-module__animate-stripes__1Iecq"};

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
    className: cx(css$8.dnd, className, {
      active
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$8.loading
  }, t('Uploading'), "\u2026", typeof _progressPercent === 'number' && `${_progressPercent}%`), typeof _progressPercent === 'number' && /*#__PURE__*/React__default.createElement("div", {
    className: css$8.progressBar
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$8.progress,
    style: {
      width: `${_progressPercent}%`
    }
  })));
  if (selectedFile) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$8.file, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$8.fileExtend
  }, ".csv"), /*#__PURE__*/React__default.createElement("div", {
    className: css$8.fileSection
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$8.fileName
  }, selectedFile.name), /*#__PURE__*/React__default.createElement("div", {
    className: css$8.fileSize
  }, formatBytes(selectedFile.size))), /*#__PURE__*/React__default.createElement("div", {
    onClick: removeFile,
    className: cx(css$8.fileRemove, 'mdi mdi-close')
  }));
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$8.dnd, className, {
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
    className: css$8.placeholder
  }, t('dragHereAFile'), '', Boolean(formats) && `(${formats.join(', ')})`, ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    onClick: onClick,
    href: "#"
  }, t('upload')), ' ', t('fromYourComputer'), "."));
};

var css$9 = {"loader":"_styles-module__loader__18_Ho","text":"_styles-module__text__3dZu_","stacks-pulse":"_styles-module__stacks-pulse__350eA","grid":"_styles-module__grid__Uki0v","item":"_styles-module__item__MvjKB","pic":"_styles-module__pic__Pc6fT","section":"_styles-module__section__2EIKh"};

const Loader = ({}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$9.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.section
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

var css$a = {"modal":"_styles-module__modal__3FQ59","dialog":"_styles-module__dialog__268e0","close":"_styles-module__close__1Y7yz","title":"_styles-module__title__knxNI"};

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
    className: cx(css$a.modal, className, {
      show: isShow
    }),
    onClick: onClickByLayer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$a.dialog, _size, dialogClassName)
  }, withCloseButton && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$a.close, 'mdi mdi-close'),
    onClick: onClose
  }), title && /*#__PURE__*/React__default.createElement("div", {
    className: css$a.title
  }, title), children)));
};

var config = {
  API_URL: '/api',
  GA_ID: '',
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
  GITHUB_URL: ' https://github.com/dstackai',
  MEDIUM_URL: ' https://medium.com/dstackai',
  CONFIGURE_PYTHON_COMMAND: (token = '<token>', userName = '<username>') => {
    const origin = window ? window.location.origin : '';
    return `dstack config --token ${token} --user ${userName} --server ${origin}/api`;
  },
  CONFIGURE_R_COMMAND: (token = '<token>', userName = '<username>') => {
    const origin = window ? window.location.origin : '';
    return `dstack::configure(user = "${userName}", token = "${token}", persist = "global"` + `, server = "${origin}/api")`;
  }
};

var image$1 = require("./404~FXFqzVOe.svg");

var css$b = {"not-found":"_style-module__not-found__tAZyq","message":"_style-module__message__3Ok1U","help":"_style-module__help__Aa8x8"};

const NotFound = ({
  children
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$b['not-found']
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image$1,
    alt: "",
    width: "224",
    height: "77"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css$b.message
  }, children), /*#__PURE__*/React__default.createElement("div", {
    className: css$b.help
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

var css$c = {"bar":"_styles-module__bar__12oWc","progress":"_styles-module__progress__3JWjz"};

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
    className: cx(css$c.bar, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$c.progress,
    style: {
      width: `${progress}%`,
      backgroundSize: `${width}px 5px`
    }
  }));
};

var css$d = {"field":"_styles-module__field__3WCaE","input":"_styles-module__input__9Tk5W","label":"_styles-module__label__1mHtq","error":"_styles-module__error__3jOrk"};

const TextField = ({
  label,
  className,
  size: _size = 'normal',
  errors: _errors = [],
  ...props
}) => {
  const hasErrors = Boolean(_errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$d.field, className, _size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$d.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$d.input
  }, /*#__PURE__*/React__default.createElement("input", Object.assign({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$d.error
  }, _errors.join(', '))));
};

var css$e = {"search":"_styles-module__search__3s1gr","field":"_styles-module__field__17rsB","clear":"_styles-module__clear__3oKZ5","button":"_styles-module__button__3BfRl"};

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
    className: cx(css$e.search, className, {
      'is-dark': isDark
    })
  }, isShow && /*#__PURE__*/React__default.createElement(TextField, Object.assign({}, props, {
    onChange: onChangeHandle,
    className: css$e.field
  })), isShow && Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.clear,
    onClick: clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close"
  })), isShow && !Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })), !isShow && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.button,
    onClick: () => setIsShow(true)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })));
};

var css$f = {"field":"_styles-module__field__2jF9E","label":"_styles-module__label__iehEi","rcSelectLoadingIcon":"_styles-module__rcSelectLoadingIcon__VtsrG","rcSelectDropdownSlideUpIn":"_styles-module__rcSelectDropdownSlideUpIn__27wr-","rcSelectDropdownSlideUpOut":"_styles-module__rcSelectDropdownSlideUpOut__1QVN6","rcSelectDropdownSlideDownIn":"_styles-module__rcSelectDropdownSlideDownIn__1vYLX","rcSelectDropdownSlideDownOut":"_styles-module__rcSelectDropdownSlideDownOut__1-lNh","select-field":"_styles-module__select-field__1mUh_","select-field-selector":"_styles-module__select-field-selector__V9Ufm","select-field-arrow":"_styles-module__select-field-arrow__c4k8s","mdi":"_styles-module__mdi__2hNDK","select-field-selection-placeholder":"_styles-module__select-field-selection-placeholder__2Vdv0","select-field-selection-search":"_styles-module__select-field-selection-search__3GdNa","select-field-selection-search-input":"_styles-module__select-field-selection-search-input__3BOaB","select-field-selection-item":"_styles-module__select-field-selection-item__2uDu7","select-field-item-option-checkbox":"_styles-module__select-field-item-option-checkbox__2K_G1","select-field-selection-item-remove":"_styles-module__select-field-selection-item-remove__1k1IW","select-field-show-search":"_styles-module__select-field-show-search__3EVnU","select-field-show-arrow":"_styles-module__select-field-show-arrow__1xlmm","select-field-open":"_styles-module__select-field-open___jEZ1","select-field-multiple":"_styles-module__select-field-multiple__2YFSs","select-field-single":"_styles-module__select-field-single__1n3qF","select-field-clear":"_styles-module__select-field-clear__Mg5xq","select-field-item-option-state":"_styles-module__select-field-item-option-state__2yGkG","select-field-selection__choice-zoom":"_styles-module__select-field-selection__choice-zoom__3NUb5","select-field-selection__choice-zoom-appear":"_styles-module__select-field-selection__choice-zoom-appear__ZO73y","select-field-selection__choice-zoom-leave":"_styles-module__select-field-selection__choice-zoom-leave__2i54q","select-field-dropdown":"_styles-module__select-field-dropdown__14ngc"};

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
    className: cx(css$f.field, className, _align, {
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
    className: css$f.label
  }, label));
};

var css$g = {"field":"_styles-module__field__2_NXc","rcSliderTooltipZoomDownIn":"_styles-module__rcSliderTooltipZoomDownIn__2jvao","rcSliderTooltipZoomDownOut":"_styles-module__rcSliderTooltipZoomDownOut__2HgMB","slider":"_styles-module__slider__31Ylv","label":"_styles-module__label__Zo_r8","rc-slider":"_styles-module__rc-slider__1hLjI","rc-slider-rail":"_styles-module__rc-slider-rail__v9bxI","rc-slider-track":"_styles-module__rc-slider-track___3emJ","rc-slider-handle":"_styles-module__rc-slider-handle__12sQ3","rc-slider-handle-dragging":"_styles-module__rc-slider-handle-dragging__2u63-","rc-slider-handle-click-focused":"_styles-module__rc-slider-handle-click-focused__7xSSR","rc-slider-mark":"_styles-module__rc-slider-mark__1l2Qm","rc-slider-mark-text":"_styles-module__rc-slider-mark-text__2zf2c","rc-slider-mark-text-active":"_styles-module__rc-slider-mark-text-active__25tuh","rc-slider-step":"_styles-module__rc-slider-step__3wC_L","rc-slider-dot":"_styles-module__rc-slider-dot__17-SM","rc-slider-dot-active":"_styles-module__rc-slider-dot-active__1eLwY","rc-slider-dot-reverse":"_styles-module__rc-slider-dot-reverse__Ewb1d","rc-slider-disabled":"_styles-module__rc-slider-disabled__1YO43","rc-slider-vertical":"_styles-module__rc-slider-vertical__12Juq","rc-slider-tooltip-zoom-down-enter":"_styles-module__rc-slider-tooltip-zoom-down-enter__2a95b","rc-slider-tooltip-zoom-down-appear":"_styles-module__rc-slider-tooltip-zoom-down-appear__2wvsD","rc-slider-tooltip-zoom-down-leave":"_styles-module__rc-slider-tooltip-zoom-down-leave__3jMC3","rc-slider-tooltip-zoom-down-enter-active":"_styles-module__rc-slider-tooltip-zoom-down-enter-active__1M8Be","rc-slider-tooltip-zoom-down-appear-active":"_styles-module__rc-slider-tooltip-zoom-down-appear-active__3tu2z","rc-slider-tooltip-zoom-down-leave-active":"_styles-module__rc-slider-tooltip-zoom-down-leave-active__P9_lk","rc-slider-tooltip":"_styles-module__rc-slider-tooltip__1PZK2","rc-slider-tooltip-hidden":"_styles-module__rc-slider-tooltip-hidden__2CvyB","rc-slider-tooltip-placement-top":"_styles-module__rc-slider-tooltip-placement-top__qzmlA","rc-slider-tooltip-inner":"_styles-module__rc-slider-tooltip-inner__27Bp4","rc-slider-tooltip-arrow":"_styles-module__rc-slider-tooltip-arrow__35-HY"};

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
    className: cx(css$g.field, className, _align, {
      disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$g.slider
  }, /*#__PURE__*/React__default.createElement(Slider, Object.assign({
    onChange: onChangeHandle,
    tipFormatter: value => `$${value}`,
    handle: CustomHandle
  }, props))), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$g.label
  }, label));
};

var css$h = {"field":"_styles-module__field__2DYF1","hidden":"_styles-module__hidden__3z5o2"};

const StretchTitleField = ({
  value,
  placeholder: _placeholder = '',
  className,
  ...props
}) => {
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$h.field, className)
  }, /*#__PURE__*/React__default.createElement("input", Object.assign({
    type: "text",
    placeholder: _placeholder,
    value: value
  }, props)), /*#__PURE__*/React__default.createElement("div", {
    className: css$h.hidden
  }, value.length ? value : _placeholder));
};

var css$i = {"tabs":"_styles-module__tabs__-hQvT","tab":"_styles-module__tab__2dsXN","soon":"_styles-module__soon__2_DJa"};

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
    className: cx(css$i.tabs, className)
  }, tabs.map((i, index) => /*#__PURE__*/React__default.createElement("div", {
    key: index,
    className: cx(css$i.tab, {
      active: value === i.value
    }),
    onClick: () => onChange(i.value)
  }, i.label, i.soon && /*#__PURE__*/React__default.createElement("span", {
    className: css$i.soon
  }, t('soon')))));
};

var css$j = {"field":"_styles-module__field__3PgPN","textarea":"_styles-module__textarea__2Ok_K","label":"_styles-module__label__1qnsP","error":"_styles-module__error__1C6bH"};

const TextAreaField = ({
  label,
  className,
  size: _size = 'normal',
  errors: _errors = [],
  ...props
}) => {
  const hasErrors = Boolean(_errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$j.field, className, _size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$j.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$j.textarea
  }, /*#__PURE__*/React__default.createElement("textarea", Object.assign({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$j.error
  }, _errors.join(', '))));
};

var css$k = {"tooltip":"_style-module__tooltip__rE8Jn"};

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
      className: css$k.tooltip
    }, overlayContent)
  }, props), children);
};

var css$l = {"switcher":"_styles-module__switcher__3NMzC"};

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
    className: cx(css$l.switcher, stateValue, className),
    onClick: toggleValue
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-grid"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-list"
  }));
};

export { AccessForbidden, Avatar, Button, CheckboxField, CodeViewer, Copy, Dropdown, FileDragnDrop, Loader, MarkdownRender, Modal, NotFound, ProgressBar, SearchField, SelectField, SliderField, Spinner, StretchTitleField, Tabs, TextAreaField, TextField, Tooltip, ViewSwitcher };
//# sourceMappingURL=index.modern.js.map
