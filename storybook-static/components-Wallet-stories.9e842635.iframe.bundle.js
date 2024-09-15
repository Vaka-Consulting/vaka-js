"use strict";(self.webpackChunkvaka_js=self.webpackChunkvaka_js||[]).push([[455],{"./node_modules/@mui/material/Divider/Divider.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Divider_Divider});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),composeClasses=__webpack_require__("./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/colorManipulator.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),DefaultPropsProvider=__webpack_require__("./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"),generateUtilityClasses=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getDividerUtilityClass(slot){return(0,generateUtilityClass.Ay)("MuiDivider",slot)}(0,generateUtilityClasses.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],DividerRoot=(0,styled.Ay)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.absolute&&styles.absolute,styles[ownerState.variant],ownerState.light&&styles.light,"vertical"===ownerState.orientation&&styles.vertical,ownerState.flexItem&&styles.flexItem,ownerState.children&&styles.withChildren,ownerState.children&&"vertical"===ownerState.orientation&&styles.withChildrenVertical,"right"===ownerState.textAlign&&"vertical"!==ownerState.orientation&&styles.textAlignRight,"left"===ownerState.textAlign&&"vertical"!==ownerState.orientation&&styles.textAlignLeft]}})((({theme,ownerState})=>(0,esm_extends.A)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(theme.vars||theme).palette.divider,borderBottomWidth:"thin"},ownerState.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},ownerState.light&&{borderColor:theme.vars?`rgba(${theme.vars.palette.dividerChannel} / 0.08)`:(0,colorManipulator.X4)(theme.palette.divider,.08)},"inset"===ownerState.variant&&{marginLeft:72},"middle"===ownerState.variant&&"horizontal"===ownerState.orientation&&{marginLeft:theme.spacing(2),marginRight:theme.spacing(2)},"middle"===ownerState.variant&&"vertical"===ownerState.orientation&&{marginTop:theme.spacing(1),marginBottom:theme.spacing(1)},"vertical"===ownerState.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},ownerState.flexItem&&{alignSelf:"stretch",height:"auto"})),(({ownerState})=>(0,esm_extends.A)({},ownerState.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}})),(({theme,ownerState})=>(0,esm_extends.A)({},ownerState.children&&"vertical"!==ownerState.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(theme.vars||theme).palette.divider}`,borderTopStyle:"inherit"}})),(({theme,ownerState})=>(0,esm_extends.A)({},ownerState.children&&"vertical"===ownerState.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(theme.vars||theme).palette.divider}`,borderLeftStyle:"inherit"}})),(({ownerState})=>(0,esm_extends.A)({},"right"===ownerState.textAlign&&"vertical"!==ownerState.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===ownerState.textAlign&&"vertical"!==ownerState.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}}))),DividerWrapper=(0,styled.Ay)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.wrapper,"vertical"===ownerState.orientation&&styles.wrapperVertical]}})((({theme,ownerState})=>(0,esm_extends.A)({display:"inline-block",paddingLeft:`calc(${theme.spacing(1)} * 1.2)`,paddingRight:`calc(${theme.spacing(1)} * 1.2)`},"vertical"===ownerState.orientation&&{paddingTop:`calc(${theme.spacing(1)} * 1.2)`,paddingBottom:`calc(${theme.spacing(1)} * 1.2)`}))),Divider=react.forwardRef((function Divider(inProps,ref){const props=(0,DefaultPropsProvider.b)({props:inProps,name:"MuiDivider"}),{absolute=!1,children,className,component=children?"div":"hr",flexItem=!1,light=!1,orientation="horizontal",role="hr"!==component?"separator":void 0,textAlign="center",variant="fullWidth"}=props,other=(0,objectWithoutPropertiesLoose.A)(props,_excluded),ownerState=(0,esm_extends.A)({},props,{absolute,component,flexItem,light,orientation,role,textAlign,variant}),classes=(ownerState=>{const{absolute,children,classes,flexItem,light,orientation,textAlign,variant}=ownerState,slots={root:["root",absolute&&"absolute",variant,light&&"light","vertical"===orientation&&"vertical",flexItem&&"flexItem",children&&"withChildren",children&&"vertical"===orientation&&"withChildrenVertical","right"===textAlign&&"vertical"!==orientation&&"textAlignRight","left"===textAlign&&"vertical"!==orientation&&"textAlignLeft"],wrapper:["wrapper","vertical"===orientation&&"wrapperVertical"]};return(0,composeClasses.A)(slots,getDividerUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(DividerRoot,(0,esm_extends.A)({as:component,className:(0,clsx.A)(classes.root,className),role,ref,ownerState},other,{children:children?(0,jsx_runtime.jsx)(DividerWrapper,{className:classes.wrapper,ownerState,children}):null}))}));Divider.muiSkipListHighlight=!0;const Divider_Divider=Divider},"./node_modules/@mui/material/Link/Link.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Link_Link});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),composeClasses=__webpack_require__("./node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),capitalize=__webpack_require__("./node_modules/@mui/material/utils/capitalize.js"),styled=__webpack_require__("./node_modules/@mui/material/styles/styled.js"),DefaultPropsProvider=__webpack_require__("./node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"),useIsFocusVisible=__webpack_require__("./node_modules/@mui/material/utils/useIsFocusVisible.js"),useForkRef=__webpack_require__("./node_modules/@mui/material/utils/useForkRef.js"),Typography=__webpack_require__("./node_modules/@mui/material/Typography/Typography.js"),generateUtilityClasses=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("./node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getLinkUtilityClass(slot){return(0,generateUtilityClass.Ay)("MuiLink",slot)}const Link_linkClasses=(0,generateUtilityClasses.A)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var style=__webpack_require__("./node_modules/@mui/system/esm/style.js"),colorManipulator=__webpack_require__("./node_modules/@mui/system/colorManipulator.js");const colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Link_getTextDecoration=({theme,ownerState})=>{const transformedColor=(color=>colorTransformations[color]||color)(ownerState.color),color=(0,style.Yn)(theme,`palette.${transformedColor}`,!1)||ownerState.color,channelColor=(0,style.Yn)(theme,`palette.${transformedColor}Channel`);return"vars"in theme&&channelColor?`rgba(${channelColor} / 0.4)`:(0,colorManipulator.X4)(color,.4)};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const _excluded=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],LinkRoot=(0,styled.Ay)(Typography.A,{name:"MuiLink",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,styles[`underline${(0,capitalize.A)(ownerState.underline)}`],"button"===ownerState.component&&styles.button]}})((({theme,ownerState})=>(0,esm_extends.A)({},"none"===ownerState.underline&&{textDecoration:"none"},"hover"===ownerState.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===ownerState.underline&&(0,esm_extends.A)({textDecoration:"underline"},"inherit"!==ownerState.color&&{textDecorationColor:Link_getTextDecoration({theme,ownerState})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===ownerState.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Link_linkClasses.focusVisible}`]:{outline:"auto"}}))),Link_Link=react.forwardRef((function Link(inProps,ref){const props=(0,DefaultPropsProvider.b)({props:inProps,name:"MuiLink"}),{className,color="primary",component="a",onBlur,onFocus,TypographyClasses,underline="always",variant="inherit",sx}=props,other=(0,objectWithoutPropertiesLoose.A)(props,_excluded),{isFocusVisibleRef,onBlur:handleBlurVisible,onFocus:handleFocusVisible,ref:focusVisibleRef}=(0,useIsFocusVisible.A)(),[focusVisible,setFocusVisible]=react.useState(!1),handlerRef=(0,useForkRef.A)(ref,focusVisibleRef),ownerState=(0,esm_extends.A)({},props,{color,component,focusVisible,underline,variant}),classes=(ownerState=>{const{classes,component,focusVisible,underline}=ownerState,slots={root:["root",`underline${(0,capitalize.A)(underline)}`,"button"===component&&"button",focusVisible&&"focusVisible"]};return(0,composeClasses.A)(slots,getLinkUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(LinkRoot,(0,esm_extends.A)({color,className:(0,clsx.A)(classes.root,className),classes:TypographyClasses,component,onBlur:event=>{handleBlurVisible(event),!1===isFocusVisibleRef.current&&setFocusVisible(!1),onBlur&&onBlur(event)},onFocus:event=>{handleFocusVisible(event),!0===isFocusVisibleRef.current&&setFocusVisible(!0),onFocus&&onFocus(event)},ref:handlerRef,ownerState,variant,sx:[...Object.keys(colorTransformations).includes(color)?[]:[{color}],...Array.isArray(sx)?sx:[sx]]},other))}))},"./packages/react/stories/components/Wallet.stories.tsx":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.a(module,(async(__webpack_handle_async_dependencies__,__webpack_async_result__)=>{try{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WalletAddress:()=>WalletAddress,WalletBalance:()=>WalletBalance,WalletConnector:()=>WalletConnector,WalletDisconnectButton:()=>WalletDisconnectButton,WalletPicker:()=>WalletPicker,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/react/components/index.ts"),_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/react/context/index.ts"),__webpack_async_dependencies__=__webpack_handle_async_dependencies__([_components__WEBPACK_IMPORTED_MODULE_1__,_context__WEBPACK_IMPORTED_MODULE_2__]);[_components__WEBPACK_IMPORTED_MODULE_1__,_context__WEBPACK_IMPORTED_MODULE_2__]=__webpack_async_dependencies__.then?(await __webpack_async_dependencies__)():__webpack_async_dependencies__;const meta={title:"Components/Wallet",component:_components__WEBPACK_IMPORTED_MODULE_1__.ll,decorators:[Story=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_context__WEBPACK_IMPORTED_MODULE_2__.ej,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement(_context__WEBPACK_IMPORTED_MODULE_2__.xw,{projectPrefix:"storybook",projectTokenPolicyId:"171163f05e4f30b6be3c22668c37978e7d508b84f83558e523133cdf",projectAssetsPolicyIds:[],persistConnection:!0},react__WEBPACK_IMPORTED_MODULE_0__.createElement(Story,null)))]},WalletConnector={name:"WalletConnector",render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_1__.ll,null)},WalletPicker={name:"WalletPicker",render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_1__.Kv,null)},WalletAddress={name:"WalletAddress",render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_1__.gn,null)},WalletBalance={name:"WalletBalance",render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_1__.cD,null)},WalletDisconnectButton={name:"WalletDisconnectButton",render:()=>react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components__WEBPACK_IMPORTED_MODULE_1__.SH,null,"Disconnect Wallet")},__WEBPACK_DEFAULT_EXPORT__=meta,__namedExportsOrder=["WalletConnector","WalletPicker","WalletAddress","WalletBalance","WalletDisconnectButton"];WalletConnector.parameters={...WalletConnector.parameters,docs:{...WalletConnector.parameters?.docs,source:{originalSource:"{\n  name: 'WalletConnector',\n  render: () => <WalletConnectorComponent />\n}",...WalletConnector.parameters?.docs?.source}}},WalletPicker.parameters={...WalletPicker.parameters,docs:{...WalletPicker.parameters?.docs,source:{originalSource:"{\n  name: 'WalletPicker',\n  render: () => <WalletPickerComponent />\n}",...WalletPicker.parameters?.docs?.source}}},WalletAddress.parameters={...WalletAddress.parameters,docs:{...WalletAddress.parameters?.docs,source:{originalSource:"{\n  name: 'WalletAddress',\n  render: () => <WalletAddressComponent />\n}",...WalletAddress.parameters?.docs?.source}}},WalletBalance.parameters={...WalletBalance.parameters,docs:{...WalletBalance.parameters?.docs,source:{originalSource:"{\n  name: 'WalletBalance',\n  render: () => <WalletBalanceComponent />\n}",...WalletBalance.parameters?.docs?.source}}},WalletDisconnectButton.parameters={...WalletDisconnectButton.parameters,docs:{...WalletDisconnectButton.parameters?.docs,source:{originalSource:"{\n  name: 'WalletDisconnectButton',\n  render: () => <WalletDisconnectButtonComponent>Disconnect Wallet</WalletDisconnectButtonComponent>\n}",...WalletDisconnectButton.parameters?.docs?.source}}},__webpack_async_result__()}catch(e){__webpack_async_result__(e)}}))}}]);