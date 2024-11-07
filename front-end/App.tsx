import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Clasesporunidad = React.lazy(() => import('./Pages/clases'))
const AlumnosyTutores = React.lazy(() => import('./Pages/users'))
const PreguntasAResponder = React.lazy(() => import('./Pages/preguntas'))
const Respuestasalaspreguntas = React.lazy(() => import('./Pages/respuestas'))
const Inicio = React.lazy(() => import('./Pages/tutor'))
const Team = React.lazy(() => import('./Pages/team'))
const RetrievePassword = React.lazy(() => import('./Pages/forgot'))
const Register = React.lazy(() => import('./Pages/register'))
const LoginPage = React.lazy(() => import('./Pages/login'))
const Home = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/clases',
      name: 'Clases por unidad',
      component: Clasesporunidad,
    },
    {
      path: '/users',
      name: 'Alumnos y Tutores',
      component: AlumnosyTutores,
    },
    {
      path: '/preguntas',
      name: 'Preguntas A Responder',
      component: PreguntasAResponder,
    },
    {
      path: '/respuestas',
      name: 'Respuestas a las preguntas',
      component: Respuestasalaspreguntas,
    },
    {
      path: '/tutor',
      name: 'Inicio',
      component: Inicio,
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
    },
    {
      path: '/forgot/:nonce?/:email?',
      name: 'Retrieve Password',
      component: RetrievePassword,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login Page',
      component: LoginPage,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
