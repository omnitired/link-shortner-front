import React, { useEffect } from 'react';

export default function Main(props: any) {

  useEffect(() => {
    props.history.push('/stats')
  }, [])
  return (
    <>
    </>
  )
}