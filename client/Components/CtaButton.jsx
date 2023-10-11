import React from 'react'
import Link from 'next/link';

const CtaButton = ({ btnIcon, btnLink, btnTxt }) => {
  let IconName = btnIcon
  return <Link href={btnLink}>
    <button className='CtaButton transition-all'>{btnTxt}<i><IconName /></i></button>
  </Link>

}

export default CtaButton