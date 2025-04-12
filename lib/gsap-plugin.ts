// This file is needed to properly import the DrawSVG plugin for GSAP
// You'll need to install the GSAP with npm or yarn and get the DrawSVG plugin
// from the GSAP Club GreenSock membership

declare global {
    interface Window {
      DrawSVGPlugin: any
    }
  }
  
  export {}
  