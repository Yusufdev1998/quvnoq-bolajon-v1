export function Bunny({ pose = 'reach', animated = false }: { pose?: string; animated?: boolean }) {
  return <svg className={`bunny ${animated ? 'is-animated' : ''} pose-${pose}`} viewBox="0 0 260 280" fill="none" aria-hidden="true">
    <ellipse cx="130" cy="257" rx="76" ry="11" fill="#245B4B" opacity=".12" />
    <g className="bunny-body">
      <path d="M104 201L87 240Q85 253 103 252L122 218M145 202L165 237Q175 251 156 254L132 219" fill="#FFF8E9" stroke="#EAD8B9" strokeWidth="2" />
      <path d="M103 180L96 210Q108 223 127 216L131 199L139 217Q157 220 165 208L154 180" fill="#E9A85E" />
      <path className="arm arm-left" d={pose === 'still' || pose === 'wings' || pose === 'balance' ? 'M105 147Q66 153 42 141Q30 143 37 155Q67 180 106 173' : pose === 'hands' || pose === 'ball' ? 'M104 147Q70 176 113 189L124 174L100 164' : 'M105 150Q69 140 62 112Q60 98 50 105Q42 112 49 129Q63 166 106 177'} fill="#FFF8E9" stroke="#EAD8B9" strokeWidth="2" />
      <path className="arm arm-right" d={pose === 'still' || pose === 'wings' || pose === 'balance' ? 'M154 146Q191 153 217 140Q228 143 222 154Q194 180 153 173' : pose === 'hands' || pose === 'ball' ? 'M153 147Q187 176 144 189L132 174L157 164' : 'M154 151Q190 143 199 112Q201 100 211 106Q220 115 212 132Q197 169 154 176'} fill="#FFF8E9" stroke="#EAD8B9" strokeWidth="2" />
      <path d="M104 140Q128 128 153 141L163 185Q131 202 96 185Z" fill="#65A68E" />
      <path d="M113 139L122 157L133 147L144 156L149 140" fill="#C6E1CF" />
      <path d="M108 62Q75 2 93 1Q109-2 122 56M141 57Q153-5 169 4Q186 11 159 71" fill="#FFF8E9" stroke="#EAD8B9" strokeWidth="2" />
      <path d="M104 48Q91 17 96 15Q101 13 113 52M150 51Q160 18 165 18Q172 21 158 57" stroke="#F3BFB0" strokeWidth="7" strokeLinecap="round" />
      <path d="M86 79Q88 54 125 54Q163 49 175 81Q191 119 161 134Q128 151 98 132Q70 115 86 79" fill="#FFF8E9" stroke="#EAD8B9" strokeWidth="2" />
      <ellipse cx="103" cy="111" rx="10" ry="6" fill="#F6BEAA" /><ellipse cx="159" cy="110" rx="10" ry="6" fill="#F6BEAA" />
      <path d="M109 96Q113 90 117 96M144 96Q148 90 152 96" stroke="#394C43" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M126 106Q131 102 136 106L131 112Z" fill="#B27867" />
      <path d="M131 112Q131 121 122 117M131 112Q132 121 140 116" stroke="#7F6552" strokeWidth="2" strokeLinecap="round" />
      <path d="M121 170Q131 166 141 170L138 183L124 183Z" fill="#E2EAC5" /><path d="M128 171L128 179" stroke="#78A285" strokeWidth="2" />
      {pose === 'ball' && <g><circle cx="130" cy="186" r="22" fill="#F8C45A" /><path d="M111 177Q133 186 147 201M120 166Q126 188 109 192" stroke="#E88F59" strokeWidth="3" /></g>}
    </g>
  </svg>;
}

export function HeroArt() {
  return <div className="hero-art" aria-hidden="true"><svg className="hero-landscape" viewBox="0 0 400 300" fill="none">
    <path d="M52 249Q112 190 197 210Q271 147 369 244L400 300H0Z" fill="#D1DFC2" />
    <path d="M0 269Q139 214 234 255Q318 227 400 261V300H0Z" fill="#BCD2AD" />
    <circle cx="305" cy="67" r="32" fill="#F4BC54" /><g stroke="#F4BC54" strokeWidth="3" strokeLinecap="round"><path d="M305 20V12M305 122V113M257 67H249M362 67H353M271 32L265 26M342 102L349 108M269 102L263 109M343 32L349 25" /></g>
    <path d="M48 108Q45 93 59 91Q65 74 80 83Q94 78 99 92Q117 93 114 107Z" fill="#FFFCF2" /><path d="M213 39Q211 28 222 26Q228 14 238 21Q249 17 253 28Q265 30 262 39Z" fill="#FFFCF2" />
    <path d="M40 245L46 214M46 232L60 222M42 226L32 216M345 260L347 224M347 244L361 235" stroke="#79A07A" strokeWidth="3" strokeLinecap="round" />
    <g fill="#FFFAEA"><circle cx="348" cy="218" r="7" /><circle cx="340" cy="224" r="7" /><circle cx="355" cy="226" r="7" /></g><circle cx="348" cy="225" r="4" fill="#ECAF49" />
    <path d="M89 174L94 165L99 174L109 178L99 182L94 193L89 182L79 178Z" fill="#DB9B61" /><path d="M302 154L305 148L308 154L314 157L308 160L305 167L302 160L296 157Z" fill="#8DAD88" />
  </svg><Bunny /><div className="art-sticker"><span>✦</span> Harakatda quvonch!</div></div>;
}

export function ActivityArt({ type, className = '' }: { type: string; className?: string }) {
  if (type === 'bunny') return <div className={`activity-art bunny-art ${className}`}><Bunny pose="jump" /></div>;
  return <svg className={`activity-art ${className}`} viewBox="0 0 140 120" fill="none" aria-hidden="true">
    {type === 'ball' && <><ellipse cx="72" cy="104" rx="43" ry="6" fill="#555" opacity=".07" /><circle cx="70" cy="60" r="39" fill="#EFA66D" /><path d="M35 43Q73 65 96 89M57 23Q77 64 38 83M109 57Q77 36 45 91" stroke="#FFDC9E" strokeWidth="5" /><path d="M22 23L27 14M109 21L115 27M119 84L127 86" stroke="#85AC94" strokeWidth="3" strokeLinecap="round" /></>}
    {type === 'hands' && <><path d="M42 84L27 61Q23 53 29 50Q35 48 44 63L36 28Q35 19 42 20Q47 20 50 43L49 17Q50 9 56 12Q61 14 60 44L65 23Q67 15 73 19Q78 23 71 49L78 38Q84 30 88 36Q91 41 83 63L76 83Q69 102 54 98Z" fill="#EAB18C" /><path d="M82 95L101 67Q107 60 113 66Q116 71 105 86L122 60Q128 52 132 58Q136 63 116 91L106 109L83 109Z" fill="#F6C8A4" /><path d="M42 89L77 89L77 112L45 112Z" fill="#8D92BF" /><path d="M89 16L90 26M105 24L99 31M113 42L105 43M18 81L25 84" stroke="#AE9DD0" strokeWidth="3" strokeLinecap="round" /></>}
    {type === 'train' && <><rect x="22" y="48" width="62" height="42" rx="9" fill="#70A691" /><path d="M40 48V26H70V74H86V89H16V73H25V48" fill="#70A691" /><rect x="46" y="33" width="17" height="19" rx="4" fill="#DFEAC8" /><path d="M91 59H125V88H91Z" fill="#EFB577" /><circle cx="34" cy="92" r="12" fill="#567468" /><circle cx="73" cy="92" r="12" fill="#567468" /><circle cx="100" cy="92" r="9" fill="#567468" /><circle cx="121" cy="92" r="9" fill="#567468" /><circle cx="34" cy="92" r="5" fill="#F8E5B7" /><circle cx="73" cy="92" r="5" fill="#F8E5B7" /><path d="M83 83H93M17 109H131" stroke="#93B19C" strokeWidth="3" /><circle cx="32" cy="31" r="7" fill="#EFF1DE" /><circle cx="25" cy="15" r="10" fill="#EFF1DE" /></>}
    {type === 'flower' && <><path d="M71 103V63M71 89Q46 91 40 73Q63 68 71 89M72 79Q92 82 102 61Q80 58 72 79" stroke="#80A681" strokeWidth="5" fill="#A3BD92" /><g fill="#EDAE8D"><ellipse cx="70" cy="27" rx="13" ry="21" /><ellipse cx="91" cy="46" rx="21" ry="13" transform="rotate(-20 91 46)" /><ellipse cx="83" cy="67" rx="13" ry="21" transform="rotate(-35 83 67)" /><ellipse cx="57" cy="67" rx="13" ry="21" transform="rotate(35 57 67)" /><ellipse cx="49" cy="45" rx="21" ry="13" transform="rotate(20 49 45)" /></g><circle cx="70" cy="47" r="15" fill="#F4CF70" /><path d="M64 48Q70 55 77 48" stroke="#A8843B" strokeWidth="2.5" strokeLinecap="round" /></>}
    {type === 'bear' && <><circle cx="40" cy="29" r="16" fill="#BE9165" /><circle cx="99" cy="29" r="16" fill="#BE9165" /><ellipse cx="70" cy="62" rx="46" ry="43" fill="#CFAB7F" /><ellipse cx="70" cy="77" rx="25" ry="18" fill="#F7DFC1" /><circle cx="53" cy="55" r="3" fill="#51463C" /><circle cx="88" cy="55" r="3" fill="#51463C" /><ellipse cx="70" cy="71" rx="7" ry="5" fill="#51463C" /><path d="M70 75V81M70 81Q64 86 61 81M70 81Q76 86 80 81" stroke="#51463C" strokeWidth="2" /><circle cx="37" cy="71" r="7" fill="#DEAB89" /><circle cx="102" cy="71" r="7" fill="#DEAB89" /></>}
    {type === 'progress' && <><path d="M32 100V74H51V100M61 100V52H80V100M90 100V32H109V100" fill="#8DB59B" /><path d="M32 48L61 32L78 39L109 15M96 14L110 14L109 28" stroke="#DAA45F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><path d="M23 102H118" stroke="#5E856C" strokeWidth="3" strokeLinecap="round" /></>}
  </svg>;
}
