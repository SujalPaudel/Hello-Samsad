import React, { useState } from "react";
import '../../../../react/src/index.css'; 

function MapSearch() {

    const [isShown, setIsShown] = useState(false)

  

    
      return (
        <div className="App">
          <div class="mapdiv">
            <svg width="961" height="628" viewBox="-400 -383 961 628">
              <g>
                <path id="bhojpur" class="mkhover prov1 severe-one" onclick="districtHover(this)" d="M330 52L328 48L324 45L323 34L318 30L317 26L319 24L313 23L311 25L304 25L300 23L300 25L297 26L300 31L299 32L305 39L301 43L297 44L300 49L297 58L303 64L301 68L303 69L302 80L306 82L316 78L320 78L319 76L324 70L322 65L323 62L331 54z" stroke-dasharray="0">
                </path>

                <path id="dhankuta" class="mkhover prov1 severe-one" onclick="districtClick(this)" d="M343 56L338 51L330 52L331 54L323 62L322 65L324 70L319 76L321 83L326 84L327 82L329 84L333 83L335 85L340 86L344 83L347 85L351 83L359 84L357 82L353 82L354 74L351 72L346 73L345 65L342 62L342 60z"></path>
              </g>
            </svg>
              
          </div>
        </div>
      );
    }

export default MapSearch;