"use strict";(self.webpackChunkjitterphysics=self.webpackChunkjitterphysics||[]).push([[631],{916:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=t(4848),r=t(8453);const i={sidebar_position:2},a="Render Loop",s={id:"quickstart/render-loop",title:"Render Loop",description:"The first thing we need to do is to familiarize ourselves a bit with Raylib_cs. Replace the content of Program.cs with the following code:",source:"@site/docs/01_quickstart/01-render-loop.md",sourceDirName:"01_quickstart",slug:"/quickstart/render-loop",permalink:"/docs/quickstart/render-loop",draft:!1,unlisted:!1,editUrl:"https://github.com/notgiven688/jitterphysics2/tree/main/docs/docs/01_quickstart/01-render-loop.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Project Setup",permalink:"/docs/quickstart/project-setup"},next:{title:"Hello World",permalink:"/docs/quickstart/hello-world"}},c={},l=[];function d(e){const n={code:"code",h1:"h1",header:"header",img:"img",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"render-loop",children:"Render Loop"})}),"\n",(0,o.jsxs)(n.p,{children:["The first thing we need to do is to familiarize ourselves a bit with Raylib_cs. Replace the content of ",(0,o.jsx)(n.code,{children:"Program.cs"})," with the following code:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-cs",metastring:"Program.cs showLineNumbers",children:'using System.Numerics;\nusing Raylib_cs;\nusing static Raylib_cs.Raylib;\n\nstatic Texture2D GenCheckedTexture(int size, int checks, Color colorA, Color colorB)\n{\n    Image imageMag = GenImageChecked(size, size, checks, checks, colorA, colorB);\n    Texture2D textureMag = LoadTextureFromImage(imageMag);\n    UnloadImage(imageMag);\n    return textureMag;\n}\n\n// set a hint for anti-aliasing\nSetConfigFlags(ConfigFlags.Msaa4xHint);\n\n// initialize a 1200x800 px window with a title\nInitWindow(1200, 800, "BoxDrop example");\n\n// dynamically create a plane model\nTexture2D texture = GenCheckedTexture(10, 1,  Color.LightGray, Color.Gray);\nModel planeModel = LoadModelFromMesh(GenMeshPlane(10, 10, 10, 10));\nSetMaterialTexture(ref planeModel, 0, MaterialMapIndex.Diffuse, ref texture);\n\n// create a camera\nCamera3D camera = new ()\n{\n    Position = new Vector3(-20.0f, 8.0f, 10.0f),\n    Target = new Vector3(0.0f, 4.0f, 0.0f),\n    Up = new Vector3(0.0f, 1.0f, 0.0f),\n    FovY = 45.0f,\n    Projection = CameraProjection.Perspective\n};\n\n// 100 fps target\nSetTargetFPS(100);\n\n// simple render loop\nwhile (!WindowShouldClose())\n{\n    BeginDrawing();\n    ClearBackground(Color.Blue);\n\n    BeginMode3D(camera);\n\n    DrawModel(planeModel, Vector3.Zero, 1.0f, Color.White);\n\n    EndMode3D();\n    DrawText($"{GetFPS()} fps", 10, 10, 20, Color.White);\n\n    EndDrawing();\n}\n\nCloseWindow();\n'})}),"\n",(0,o.jsx)(n.p,{children:"Running your program should now display a plane:"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{alt:"plane",src:t(8083).A+"",width:"1193",height:"792"})}),"\n",(0,o.jsx)(n.p,{children:"We will add some physically simulated boxes in the next chapter."})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8083:(e,n,t)=>{t.d(n,{A:()=>o});const o=t.p+"assets/images/raylibplane-4a68c1c8056847ef1ae8f6fd8af1fd5a.png"},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var o=t(6540);const r={},i=o.createContext(r);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);