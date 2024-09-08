import {Route, Switch} from 'wouter'
import AdminPage from './pages/admin'
import ClientPage from './pages/client'

function App() {

  return (
    <>
     <Switch>
      <Route path={'/admin'} component={AdminPage}/>
      <Route path={'/'} component={ClientPage}/>
     </Switch>
    </>
  )
}

export default App
