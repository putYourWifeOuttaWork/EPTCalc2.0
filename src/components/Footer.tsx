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
            © {new Date().getFullYear()} EPT Productivity Calculator. MIT License.
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
                <summary className="cursor-pointer font-medium print:hidden">CSM Academic Brief: </summary>
                   <div className="mt-2 p-4 bg-white rounded-lg shadow text-xs">
                    <h3>The Critical Impact of User Interface Design on Business System Productivity</h3>
                
                <h4>Introduction</h4>
                <p>In the modern business landscape, the efficiency of human-to-business-system interfaces plays a crucial role in overall productivity. While consumer-facing applications have long prioritized user experience, many business systems lag behind, focusing primarily on functionality at the expense of usability. This paper examines the current challenges in business system interfaces and explores the significant impact of system response times on user productivity.
                </p>
                     <br/>
                
                <ol>
                  <li>1. Macro-Processing Focus: Business systems are often designed for macro-level processes, such as project completion or opportunity progression, rather than optimizing for the numerous micro-tasks that make up an employee's daily workflow. </li>
                  <li>2. Complexity Over Usability: Front-office employees frequently work with interfaces containing excessive form fields, lack of descriptive tooltips, and non-intuitive design elements. This complexity leads to increased error rates and reduced efficiency. </li>
                  <li>3. Function Over Form: The emphasis on functionality often overshadows the importance of form in business system design, resulting in interfaces that are difficult to navigate and use effectively.</li>
                  <li>4. Data Silos and Processing Overhead: Despite advancements in data management and processing capabilities, many business systems suffer from data silos and inefficient data traversal, leading to slower response times and reduced user productivity.</li>
                </ol>
                     
                     <br/>
                <h5>The Psychological Impact of System Response Times</h5>
                <p>The Doherty Effect posits that productivity soars when a computer and its users interact at a pace (less than 400ms) that ensures neither has to wait on the other. The potential benefits for an organization in providing improved and ultimately sub-second response time for online computing include:</p>
                <br/>
                <h5>Benefits Shown By Studies</h5>
                <ol>
                  <li> 1. Substantial cost savings</li>
                  <li> 2. Improved individual productivity</li>
                  <li> 3. Shortened project schedules</li>
                  <li> 4. Better quality of work</li>
                </ol>
                <br/>
                     <p>These benefits are inherent in the computing situation and do not depend on the type of work being done, as demonstrated by the diversity of environments in which they have been observed.</p>
                <br/>
                <h5>Quantifying the Productivity Impact</h5>
                  <b><p> Using the Equation: Y = a* LOG(x)+b </p></b><br/>
                     
              <ol>
                <li> Y is Productivity (tasks per minute over a given EPT measurement</li>
                <li> a is the variable representing the specific theoretical maximum interactions/min at a specific EPT, given a true limiatation of 60 transactions/minute, and a human thought and personal action time reduction. For example, the maximum Transactions/min then would be 60 divided by EPT. So, at 3.0 EPT, Actual max = 20. To account for human thought and movement timing averages we take 25% of this true maximum and create the theoretical max of 5 actions/min at 3.0 EPT giving us a roundabout estimate, that will be used to calculate the logarithmic adjusted max with the EPT equation.</li>
                <li> b is the variable representing EPT in seconds (Required Entry as key variable and X-Intercept</li>
                <li> x is the variable representing the theoretical actions per minute (a) divided by the EPT at hand (b) = a[0] / b[0] (where [0] represents the first coordinate in the array of measured coordinates at the entered EPT value - there's consdideration here for using slightly more precise LN((a[0]-a[1])/(b[0]-b[1])), to draw the curve and pinpoint middling EPTs, like 1.23 </li>
              
              
              </ol>
              </div>
            </div>
          </details>
        </div>
      </div>
    </footer>
  );
}
