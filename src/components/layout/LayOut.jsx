import Header from '../header/Header';
const LayOut = ({children}) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default LayOut;