import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Backofficemodulescss from 'dist/css/Backoffice.module.scss'
import { Fade, Zoom } from 'react-awesome-reveal'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'

const Inicio: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const theme = Backofficemodulescss

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  authHeaders().then((result) => {
    if (!result) {
      navigation.push('/')
    }
  })

  AuthService.getCurrentUser().then((currentUser) => {
    if (currentUser && currentUser.Role !== 'Admin') {
      props.history.push('/')
    }
  })

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.back_body}>
        <Sidebar color="Black" open={true}>
          <NavLink exact to="/" key="uz1NSD9K">
            <ListItem button className={classes.itemLink}>
              <ListItemText>
                <picture>
                  <img
                    className={theme.back_backgroud_link_aptugo}
                    src="/img/Logo_Final_sin_fondo.png"
                    alt="/img/Logo_Final_sin_fondo.png"
                    width="165"
                    height="45"
                  />
                </picture>
              </ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/respuestas" key="tcfqLhz5">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Respuestas a las preguntas</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/preguntas" key="JPH51iWQ">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Preguntas A Responder</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/users" key="02HKeFLv">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Alumnos y Tutores</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/clases" key="3tlVGsTU">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Clases por unidad</ListItemText>
            </ListItem>
          </NavLink>
        </Sidebar>
        <div title="div" className={theme.back_content_inicio}>
          <div title="div" className={theme.small_circle}></div>

          <div title="div" className={theme.big_circle}>
            <div title="div" className={theme.center_cicle}>
              <div title="div">
                <Zoom direction={'up'} delay={0} duration={2500} damping={0.5}>
                  <picture>
                    <img className={theme.bot} src="/img/bot.gif" alt="/img/bot.gif" />
                  </picture>
                </Zoom>
              </div>
            </div>
          </div>

          <div title="div">
            <Fade direction={'left'} delay={0} duration={1000} damping={0.5}>
              <Typography variant="h4">
                Por favor, <br></br>contestá las preguntas
              </Typography>
            </Fade>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Inicio
