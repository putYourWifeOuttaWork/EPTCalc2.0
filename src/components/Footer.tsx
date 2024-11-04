import React, { useState, useRef } from 'react';
import { Calculator } from 'lucide-react';

interface FooterProps {
  citationsRef?: React.RefObject<HTMLDetailsElement>;
}

export function Footer({ citationsRef }: FooterProps) {
  return (
    <footer className="bg-gray-50 print:bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <Calculator className="h-6 w-6 text-gray-400" />
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} EPT Productivity Calculator. All rights reserved.
          </p>
          
          <details ref={citationsRef} className="text-sm text-gray-600 print:open">
            <summary className="cursor-pointer font-medium print:hidden">Citations and Disclaimer</summary>
            <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs">
              <p className="mb-4">
                The outputs calculated herein are not claims or guarantees, forecasts, or results. 
                This study is a derivative of hundreds of studies which contribute to the canon "Law of UIUX" - Doherty's Threshold.
              </p>
              <div className="space-y-2">
                <p><a href="https://www.researchgate.net/publication/202165676_The_Economic_Value_of_Rapid_Response_Time" className="text-blue-500 hover:underline">IBM 1982, The Economic Value of Rapid Response Time</a></p>
                <p>Myers, Brad. (1985). The importance of percent-done progress indicators for computer-human interfaces. ACM SIGCHI Bulletin. 16. 11-17.</p>
                <p>Miller, Lawrence. (1977). A Study in Man-Machine Interaction. AFIPS Natl Comput Conf Expo Conf Proc. 46. 409-421.</p>
                <p>Weisberg, David. (1984). The Impact of Network System Architecture on CAD/CAM Productivity. Computer Graphics and Applications, IEEE. 4. 36-40.</p>
                <p>Spence, Robert. (1993). Human factors in interactive graphics. Computer-Aided Design. 25. 671-676.</p>
                <p>Rashid, Richard & Robertson, George. (1981). Accent: A Communication Oriented Network Operating System Kernel. Proc. Eighth ACM Symp. Operating Systems Principles. 64-75.</p>
                <p><a href="https://yusufarslan.net/sites/yusufarslan.net/files/upload/content/Miller1968.pdf" className="text-blue-500 hover:underline">Miller, Robert. (1968). Response time in man-computer conversational transactions.</a></p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}