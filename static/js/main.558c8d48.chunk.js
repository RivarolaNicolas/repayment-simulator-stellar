(this["webpackJsonprepayment-simulator-stellar"]=this["webpackJsonprepayment-simulator-stellar"]||[]).push([[0],{179:function(e,t,n){},180:function(e,t,n){},202:function(e,t){},203:function(e,t){},396:function(e,t){},398:function(e,t){},432:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r),s=n(173),c=n.n(s),o=(n(179),n(10)),i=(n(180),n(2)),u=function(e){var t=e.hidden,n=e.alertMessage,r=e.transactionSuccessful;return Object(i.jsx)("div",{children:Object(i.jsx)("p",{hidden:t,className:1==r?"text-green-600 bg-green-100 rounded":"text-red-600 bg-red-100 rounded",children:n})})},l=n(182),d=n(174),b=function(e){var t=Object(r.useState)(Number),n=Object(o.a)(t,2),a=n[0],s=n[1],c=Object(r.useState)(Number),b=Object(o.a)(c,2),f=b[0],j=b[1],m=Object(r.useState)(999999),p=Object(o.a)(m,2),h=p[0],g=p[1],x=Object(r.useState)(Number),O=Object(o.a)(x,2),v=O[0],y=O[1],w=Object(r.useState)(Number),N=Object(o.a)(w,2),S=N[0],T=N[1],E=Object(r.useState)(Number),K=Object(o.a)(E,2),k=K[0],A=K[1],B=Object(r.useState)(null),F=Object(o.a)(B,2),P=F[0],C=F[1],D=Object(r.useState)("invisible"),M=Object(o.a)(D,2),J=M[0],L=M[1],U=Object(r.useState)(""),X=Object(o.a)(U,2),I=X[0],R=X[1],V=Object(r.useState)(!0),W=Object(o.a)(V,2),Z=W[0],_=W[1],q=Object(r.useState)(!0),z=Object(o.a)(q,2),H=z[0],Q=z[1],Y=e.borrowerAccountPrivateKey,G=e.setBorrowerAccountPrivateKey;return Object(r.useEffect)((function(){!0===P?(L(!1),R("Transaction Succesful")):!1===P&&(L(!1),R("Transaction Failed"))}),[P]),Object(r.useEffect)((function(){j(function(e){var t=.08/12;return Number(e*(t*Math.pow(t+1,60))/(Math.pow(t+1,60)-1))}(a))}),[a]),Object(r.useEffect)((function(){y(function(e,t){return Number(60*t)}(0,f))}),[a,f]),Object(r.useEffect)((function(){T(function(e,t,n){return Number(t*(100*(n-e)/n/100)*.02)}(a,h,v))}),[a,h,v,S]),Object(r.useEffect)((function(){A(function(e,t,n){var r=t-e;return Number(void 0!=r&&void 0!=n&&r<n?r:n)}(f,h,S))}),[f,h,S]),Object(r.useEffect)((function(){f<=h?Q(!0):f>h&&Q(!1)}),[f,h]),Object(i.jsx)("div",{className:"overflow-x-hidden overflow-y-hidden ",children:Object(i.jsxs)("div",{className:"bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden md:my-10 ",children:[Object(i.jsxs)("div",{className:"px-4 py-8 sm:px-10",children:[Object(i.jsxs)("div",{className:"relative mt-6",children:[Object(i.jsx)("div",{className:"absolute inset-0 flex items-center",children:Object(i.jsx)("div",{className:"w-full border-t border-gray-300"})}),Object(i.jsx)("div",{className:"relative flex justify-center text-sm leading-5",children:Object(i.jsx)("span",{className:"px-2 text-gray-500 bg-white",children:"Loan Repayment Simulator"})})]}),Object(i.jsx)("div",{className:"mt-6",children:Object(i.jsxs)("div",{className:"w-full space-y-6",children:[Object(i.jsx)("div",{className:"w-full",children:Object(i.jsx)("div",{className:" relative ",children:Object(i.jsx)("input",{type:"text",id:"loan-amount",onChange:function(e){s(Number(e.target.value))},className:"rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",placeholder:"Loan amount"})})}),Object(i.jsx)("div",{className:"w-full",children:Object(i.jsxs)("div",{className:" relative ",children:[Object(i.jsx)("input",{type:"text",id:"repayment-amount",onChange:function(e){g(Number(e.target.value))},className:h>f?"rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ":"rounded-lg border-transparent flex-1 appearance-none border border-red-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ",placeholder:"Repayment amount"}),Object(i.jsx)("p",{className:"text-red-500",hidden:H,children:"You have to make equal or more than the minimum repayment"})]})}),Object(i.jsx)("div",{className:"w-full",children:Object(i.jsxs)("div",{className:" relative ",children:[Object(i.jsxs)("label",{forhtml:"private-key",className:"relative text-gray-400 focus-within:text-gray-600 block",children:[Object(i.jsx)(d.a,{className:"pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"}),Object(i.jsx)("input",{name:"private-key",type:"text",id:"private-key",onChange:function(e){56===e.target.value.length&&0===e.target.value.indexOf("S")?(G(e.target.value),_(!1)):(_(!0),G(!1))},className:" rounded-lg border-transparent border border-gray-300 bg-white placeholder-gray-400 text-gray-700 appearance-none w-full block pl-14 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",placeholder:"Stellar Private Key"})]}),0==Y?Object(i.jsx)("div",{className:"text-gray-500 mt-2",children:"Enter valid Private Key to be able to submit transaction"}):""]})}),Object(i.jsx)("div",{children:Object(i.jsx)("span",{className:"block w-full rounded-md shadow-sm",children:Object(i.jsx)("button",{type:"button",id:"submit-transaction",hidden:Z,onClick:function(e){e.preventDefault(),function(e,t,n,r){var a=new l.Server("https://horizon-testnet.stellar.org"),s=l.Keypair.fromSecret("SBNJMFBUVROLXVHVZUK3SXXB5I6MN3AUJSUX5WCTQN6WBEDDZPF7DDJZ"),c=l.Keypair.fromSecret(e),o=new l.Asset("WNT",s.publicKey()),i=new l.Asset("AUD",s.publicKey());a.loadAccount(c.publicKey()).then((function(e){var t=new l.TransactionBuilder(e,{fee:l.BASE_FEE,networkPassphrase:l.Networks.TESTNET}).addOperation(l.Operation.changeTrust({asset:o})).addOperation(l.Operation.changeTrust({asset:i})).setTimeout(100).build();return t.sign(c),a.submitTransaction(t)})).then(console.log()).then((function(){return a.loadAccount(s.publicKey())})).then((function(e){var r=new l.TransactionBuilder(e,{fee:l.BASE_FEE,networkPassphrase:l.Networks.TESTNET}).addOperation(l.Operation.payment({destination:c.publicKey(),asset:o,amount:t.toFixed(2)})).addOperation(l.Operation.payment({destination:c.publicKey(),asset:i,amount:n.toFixed(2)})).setTimeout(100).build();return r.sign(s),a.submitTransaction(r)})).then((function(){return r(!0)}),(function(){return r(!1)})).catch((function(e){console.error("Error!",e)}))}(Y,k,S,C)},className:"py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ",children:"Submit Transaction"})})})]})})]}),Object(i.jsx)("div",{className:"px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10",children:Object(i.jsx)(u,{transactionSuccessful:P,hidden:J,alertMessage:I})})]})})};var f=function(){var e=Object(r.useState)(""),t=Object(o.a)(e,2),n=t[0],a=t[1];return Object(i.jsx)("div",{className:"w-screen h-screen",children:Object(i.jsx)(b,{setBorrowerAccountPrivateKey:a,borrowerAccountPrivateKey:n})})},j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,433)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};c.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(f,{})}),document.getElementById("root")),j()}},[[432,1,2]]]);
//# sourceMappingURL=main.558c8d48.chunk.js.map