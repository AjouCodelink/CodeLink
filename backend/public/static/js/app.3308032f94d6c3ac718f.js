webpackJsonp([1],{"4+hh":function(t,e){},"9TP5":function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyeiIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4="},AwN4:function(t,e){},C8mJ:function(t,e,i){t.exports=i.p+"static/img/img2.1aacb5e.jpg"},M1g5:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("7+uW"),s=i("Lgyv"),n=i.n(s),o=(i("4+hh"),i("giDI"),i("mtWM")),c=i.n(o);a.default.use(n.a);var l={name:"App",data:function(){return{isloggedin:!1,user:{email:"",password:""}}},created:function(){var t=this;this.$http.get("/api/supporter/login/isloggedin").then(function(e){t.isloggedin=e.data.isloggedin,console.log(t.isloggedin)})},methods:{login:function(){c.a.post("/api/supporter/login/check",{email:this.user.email,password:this.user.password}).then(function(t){alert("success login"),location.reload()},function(t){alert("login failed")}).catch(function(t){alert(t)})}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-container",attrs:{id:"app"}},[i("md-app",{attrs:{"md-mode":"fixed-last"}},[i("md-app-toolbar",{staticClass:"md-large md-dense md-primary",staticStyle:{backgroundcolor:"#0100FF"}},[i("div",{staticClass:"md-toolbar-row"},[i("span",{staticClass:"md-title"},[t._v("YUMI_managerpage")])]),t._v(" "),i("div",{staticStyle:{flex:"1"}},[i("div",{attrs:{align:"right"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],attrs:{placeholder:"ID"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],attrs:{placeholder:"password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}}),t._v(" "),i("button",{on:{click:t.login}},[t._v("login")])])]),t._v(" "),i("div",{staticClass:"md-toolbar-row"},[i("md-tabs",{staticClass:"md-primary",staticStyle:{margin:"auto",height:"30px"}},[i("md-tab",{attrs:{id:"tab-dashBoard","md-label":"문의사항 관리",to:"/dashBoard"}}),t._v(" "),i("md-tab",{attrs:{id:"tab-SupporterList","md-label":"서포터즈 목록",to:"/SupporterList"}}),t._v(" "),i("md-tab",{attrs:{id:"tab-SupporterAssign","md-label":"서포터즈 신청",to:"/SupporterAssign"}})],1)],1)])],1),t._v(" "),i("router-view")],1)},staticRenderFns:[]};var d=i("VU/8")(l,r,!1,function(t){i("AwN4")},null,null).exports,m=i("/ocq"),u={data:function(){return{supporterlists:{},submit:{name:"",email:"",contact:"",text:"",img_path:""}}},created:function(){var t=this;this.$http.get("/api/supporter").then(function(e){t.supporterlists=e.data,console.log("Success"),console.log(t.supporterlists)})},methods:{Accept:function(t){var e=this;this.$http.post("/api/supporter/accept",t).then(function(t){alert("서포터 등록이 완료되었습니다. 메인 페이지로 이동합니다."),e.$router.push({name:"home"})}).catch(function(t){console.log("오류입니다. 잠시 후 다시 시도해주세요")})},Decline:function(t){var e=this;this.$http.post("/api/supporter/decline",t).then(function(t){alert("서포터 해제가 완료되었습니다. 메인 페이지로 이동합니다."),e.$router.push({name:"home"})}).catch(function(t){console.log("Finish Request failed"),console.log("오류입니다. 잠시 후 다시 시도해주세요")})}}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[i("div",{staticClass:"supportermain",staticStyle:{"min-height":"600px"}},t._l(t.supporterlists,function(e){return i("div",{key:e.name},[e.isAccepted?t._e():i("div",[i("md-card",{staticStyle:{width:"40%",margin:"4px",marginTop:"50px",display:"inline-block","vertical-align":"top"}},[i("md-card-header",[i("md-card-header-text",[i("div",{staticClass:"md-title",staticStyle:{margin:"auto",marginLeft:"25%","text-align":"center"}},[t._v("\n                  "+t._s(e.name)+"\n                  "),i("br"),t._v(" "),i("br")]),t._v(" "),i("div",{staticClass:"md-subhead",staticStyle:{"text-align":"left","font-weight":"bold"}},[t._v("\n                  # 이메일: "+t._s(e.email)+"\n                  "),i("br"),t._v("\n                  # 연락처: "+t._s(e.contact)+"\n                  "),i("br"),t._v("\n                  # 설명글: "+t._s(e.text)+"\n                  "),i("br")])]),t._v(" "),i("md-card-media",{attrs:{"md-medium":""}})],1),t._v(" "),i("md-card-actions",[i("md-button",{staticClass:"md-raised md-accent",on:{click:function(i){return t.Decline(e)}}},[t._v("Decline")]),t._v(" "),i("md-button",{staticClass:"md-raised md-primary",on:{click:function(i){return t.Accept(e)}}},[t._v("Accept")])],1)],1)],1)])}),0),t._v(" "),i("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#FFF",height:"30px"}})])])},staticRenderFns:[]};var v=i("VU/8")(u,p,!1,function(t){i("M1g5")},null,null).exports,h={data:function(){return{bottomPosition:"md-bottom-right",img_path:"",active:!1,view_info:!1,submit:{name:"",email:"",contact:"",text:""}}},methods:{fileSelect:function(){console.log(this.$refs),this.img_path=this.$refs.img_path.files[0],console.log(this.img_path)},Register:function(){var t=this,e=new FormData;e.append("file",this.img_path),e.append("email",this.submit.email),this.$http.post("/api/supporter/assign",this.submit).then(function(i){t.$http.post("/api/images/supporter/upload",e,{headers:{"Content-type":"multipart/form-data"}}).then(function(t){console.log("Sumit Success")}).catch(function(t){console.log("Submit failed")})}).catch(function(t){console.log("Submit failed")}),this.active=!1,this.view_info=!0}}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[a("div",{staticClass:"supportermain",staticStyle:{"min-height":"600px"}},[a("md-content",{staticClass:"md-elevation-10",staticStyle:{marginTop:"10%",marginLeft:"25%",width:"50%",height:"300px"}},[t.view_info?a("div",{staticStyle:{"text-align":"left","font-weight":"bold"}},[t._v("\n          등록이 완료되었습니다.\n          "),a("br"),t._v(" "),a("br"),t._v("\n          # 이름: "+t._s(t.submit.name)+"\n          "),a("br"),t._v("\n          # 이메일: "+t._s(t.submit.email)+"\n          "),a("br"),t._v("\n          # 연락처: "+t._s(t.submit.contact)+"\n          "),a("br"),t._v("\n          # 설명글: "+t._s(t.submit.text)+"\n          "),a("br")]):a("div",[t._v("아직 등록이 되지 않았습니다. 아래의 버튼을 눌러 서포터즈 등록을 진행해주세요")])]),t._v(" "),a("md-speed-dial",{class:t.bottomPosition,staticStyle:{marginRight:"20%",marginBottom:"8%"}},[a("md-button",{staticClass:"md-fab md-primary",on:{click:function(e){t.active=!0}}},[a("img",{attrs:{src:i("9TP5")}})])],1),t._v(" "),a("md-dialog",{staticStyle:{width:"500px",height:"1000px"},attrs:{"md-active":t.active},on:{"update:mdActive":function(e){t.active=e},"update:md-active":function(e){t.active=e}}},[a("md-dialog-title",[t._v("서포터즈 신청")]),t._v(" "),a("md-field",{staticClass:"select"},[a("label",[t._v("신청자 이름")]),t._v(" "),a("md-input",{model:{value:t.submit.name,callback:function(e){t.$set(t.submit,"name",e)},expression:"submit.name"}})],1),t._v(" "),a("md-field",{staticClass:"select"},[a("label",[t._v("신청자 이메일")]),t._v(" "),a("md-input",{model:{value:t.submit.email,callback:function(e){t.$set(t.submit,"email",e)},expression:"submit.email"}})],1),t._v(" "),a("md-field",{staticClass:"select"},[a("label",[t._v("신청자 연락처")]),t._v(" "),a("md-input",{model:{value:t.submit.contact,callback:function(e){t.$set(t.submit,"contact",e)},expression:"submit.contact"}})],1),t._v(" "),a("md-field",{staticClass:"select"},[a("label"),t._v(" "),a("input",{ref:"img_path",attrs:{type:"file"},on:{change:function(e){return t.fileSelect()}}})]),t._v(" "),a("md-field",{staticClass:"select"},[a("label",[t._v("설명글")]),t._v(" "),a("md-textarea",{model:{value:t.submit.text,callback:function(e){t.$set(t.submit,"text",e)},expression:"submit.text"}})],1),t._v(" "),a("md-dialog-actions",[a("md-button",{staticClass:"md-primary",on:{click:function(e){t.active=!1}}},[t._v("Close")]),t._v(" "),a("md-button",{staticClass:"md-primary",on:{click:t.Register}},[t._v("Submit")])],1)],1)],1),t._v(" "),a("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#FFF",height:"30px"}})])])},staticRenderFns:[]};var f=i("VU/8")(h,g,!1,function(t){i("WlNo")},null,null).exports,_={name:"CardExpansion",data:function(){return{Questions:{email:"",content:""}}},created:function(){var t=this;this.$http.get("/api/supporter/question").then(function(e){t.Questions=e.data,console.log("Success")})},methods:{Finished:function(t){var e=this;this.$http.post("/api/supporter/questionFinished",t).then(function(t){console.log("Finish Requst Success"),alert("문의 사항이 해결되었습니다. 메인 탭으로 이동합니다."),e.$router.push({name:"home"})}).catch(function(t){console.log("Finish Request failed"),console.log("오류입니다. 잠시 후 다시 시도해주세요")})}}},b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"card-expansion",staticStyle:{marginTop:"5%"}},t._l(t.Questions,function(e){return i("div",{key:e.email},[i("md-card",[i("md-card-header",[i("div",{staticClass:"md-title"},[t._v("\n          #ID\n          "+t._s(e.email)+"\n          "),i("br"),t._v(" "),i("br")]),t._v(" "),i("div",{staticClass:"md-subhead"},[t._v("님의 문의사항")])]),t._v(" "),i("md-card-expand",[i("md-card-actions",{attrs:{"md-alignment":"space-between"}},[i("md-card-expand-trigger",[i("md-button",{staticClass:"md-accent"},[t._v("문의 내용 보기")])],1),t._v(" "),i("div",[i("md-button",{staticClass:"md-primary",on:{click:function(i){return t.Finished(e)}}},[t._v("처리 완료")])],1)],1),t._v(" "),i("md-card-expand-content",[i("md-card-content",[t._v(t._s(e.content))])],1)],1)],1)],1)}),0)},staticRenderFns:[]};var y=i("VU/8")(_,b,!1,function(t){i("dQYy")},"data-v-4248fbec",null).exports,x={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"md-layout",staticStyle:{display:"block",color:"#F6F6F6"}},[e("div",{staticClass:"md-layout-item"},[e("img",{attrs:{src:i("C8mJ")}})]),this._v(" "),e("div",{staticClass:"md-layout-item",staticStyle:{backgroundColor:"#F2CB61",height:"30px"}},[this._v("이윤구")])])])}]},C=i("VU/8")(null,x,!1,null,null,null).exports;a.default.use(m.a);var S=new m.a({mode:"history",routes:[{path:"/SupporterList",name:"SupporterList",component:v},{path:"/SupporterAssign",name:"SupporterAssign",component:f},{path:"/",name:"home",component:C},{path:"/dashBoard",name:"dashBoard",component:y}]});a.default.prototype.$http=c.a,a.default.config.productionTip=!1,new a.default({el:"#app",router:S,components:{App:d},template:"<App/>"})},WlNo:function(t,e){},dQYy:function(t,e){},giDI:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.3308032f94d6c3ac718f.js.map