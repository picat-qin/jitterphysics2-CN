import{dotnet}from"./_framework/dotnet.js";async function initialize(){const{getAssemblyExports:e,getConfig:n,runMain:t}=await dotnet.withDiagnosticTracing(!1).create(),i=n(),a=await e(i.mainAssemblyName);dotnet.instance.Module.canvas=document.getElementById("canvas"),await t();document.getElementById("spinner").remove(),window.requestAnimationFrame((function e(){a.WebDemo.Application.UpdateFrame(),window.requestAnimationFrame(e)}))}initialize().catch((e=>{console.error("An error occurred during initialization:",e)}));