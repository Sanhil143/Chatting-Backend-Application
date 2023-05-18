import './App.css';
import {Route} from 'react-router-dom'
import Homepage from './pages/Homepage'

function App() {
  return (
    <>
    <Route path="/" component={Homepage} exact/>
    </>
  )
}

export default App;
