import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import blue from '@mui/material/colors/blue'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FAQsStylesmodulescss from 'dist/css/FAQsStyles.module.scss'
import { NavLink } from 'react-router-dom'
import AuthService from '../services/auth.service'

const aptugotheme = createTheme({
  palette: {
    primary: blue,
  },
})

const LoginPage: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const [loginError, setloginError] = React.useState<any>(null)
  const [loginData, setloginData] = React.useState<any>({
    Email: '',
    Password: '',
    RememberMe: false,
  })
  const theme = FAQsStylesmodulescss

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  // Theme selection

  const handleLogin = () => {
    AuthService.login(loginData.Email, loginData.Password).then(
      (res) => {
        props.history.push('/')
      },
      (error) => {
        setloginError(error.response.data.message)
      }
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.loginBody}>
          <div title="NavBar" className={theme.navbar}>
            <div title="Logo">
              <div title="div" className={theme.logo_div}>
                <a href="/">
                  <picture>
                    <img src="/img/Logo_Final_sin_fondo.png" alt="/img/Logo_Final_sin_fondo.png" width="165" height="45" />
                  </picture>
                </a>
              </div>
            </div>
          </div>

          <div title="div" className={theme.fondo}>
            <Container className={theme.loginContainer} maxWidth="md">
              <picture>
                <img src="/img/Logo_Final_sin_fondo.png" alt="/img/Logo_Final_sin_fondo.png" width="202" height="55" />
              </picture>

              <div title="Login Box" className={theme.loginContent}>
                <div title="Heading" className={theme.loginHeading}>
                  <Typography variant="h3">Iniciar sesión</Typography>

                  <Typography variant="body1">Completá tus datos</Typography>
                </div>

                {loginError && (
                  <React.Fragment>
                    <Alert variant="standard" severity="error">
                      {loginError}
                    </Alert>
                  </React.Fragment>
                )}

                <div title="Inputs" className={theme.divInputs}>
                  <TextField
                    variant="outlined"
                    placeholder="Email Address"
                    margin="normal"
                    label="Correo electrónico"
                    className={theme.loginInput}
                    type="text"
                    value={loginData.Email}
                    onChange={(e) => {
                      setloginData({ ...loginData, Email: e.target.value })
                    }}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="Contraseña"
                    className={theme.loginInput}
                    type="password"
                    value={loginData.Password}
                    onChange={(e) => {
                      setloginData({ ...loginData, Password: e.target.value })
                    }}
                  />
                </div>

                <div title="Recuperación contraseña" className={theme.loginRecupero}>
                  <FormControl margin="dense">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={loginData.RememberMe}
                          onClick={() => {
                            {
                              ;() => {
                                setloginData({ ...loginData, RememberMe: !loginData.RememberMe })
                              }
                            }
                          }}
                        />
                      }
                      label="Recordarme"
                    />
                  </FormControl>

                  <NavLink to="/forgot">
                    <span className={theme.registerLink}>¿Olvidaste tu contraseña?</span>
                  </NavLink>
                </div>

                <div title="div">
                  <Button variant="contained" color="primary" onClickCapture={handleLogin} className={theme.loginBtn}>
                    Iniciá sesión
                  </Button>
                </div>
              </div>

              <div title="Register Area" className={theme.sectionRegister}>
                <div title="div">¿No tenés una cuenta?</div>

                <div title="div">
                  <a href="/register">
                    <span className={theme.loginLink}>¡Registrate!</span>
                  </a>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </ThemeProvider>

      <div title="div" className={theme.sectionFooter}>
        <div title="Footer Sup" className={theme.footerSup}>
          <div title="Empresa" className={theme.footerLinks}>
            <span className={theme.footerTitles}>Empresa</span>

            <a target="_blank" href="https://www.aptugo.com/aboutUs">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1678663365/aptugo-removebg-preview_lw9x58.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1678663365/aptugo-removebg-preview_lw9x58.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div" className={theme.footer_icon_links}>
                  Sobre nosotros
                </div>
              </div>
            </a>

            <a target="_blank" href="https://docs.aptugo.com/reference/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679014251/Logo_docs-removebg-preview_atyr9p.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679014251/Logo_docs-removebg-preview_atyr9p.png"
                      width="23"
                      height="23"
                    />
                  </picture>
                </div>

                <div title="div" className={theme.footer_icon_links}>
                  Documentos
                </div>
              </div>
            </a>

            <a target="_blank" href="https://lms.aptugo.com/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679015157/logo-it-academy_lvooq7.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679015157/logo-it-academy_lvooq7.png"
                      width="22"
                      height="15"
                    />
                  </picture>
                </div>

                <div title="div" className={theme.footer_icon_links}>
                  Academy - lms
                </div>
              </div>
            </a>
          </div>

          <div title="Stack tecnológico" className={theme.footerLinks}>
            <span className={theme.footerTitles}>Stack Tecnológico</span>

            <a target="_blank" href="https://www.mongodb.com/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1678483561/icons8-mongodb-480_nxvnjp.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1678483561/icons8-mongodb-480_nxvnjp.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">MongoDB</div>
              </div>
            </a>

            <a target="_blank" href="https://nodejs.org/en/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1678483566/icons8-node-js-240_kwy7yr.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1678483566/icons8-node-js-240_kwy7yr.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">Node.js</div>
              </div>
            </a>

            <a target="_blank" href="https://pnpm.io/es/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679001710/pnpm_gswcxu.svg"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679001710/pnpm_gswcxu.svg"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">pnpm</div>
              </div>
            </a>

            <a target="_blank" href="https://code.visualstudio.com/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1680007616/visual-studio-code_qbbwwf.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1680007616/visual-studio-code_qbbwwf.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">Visual Studio Code</div>
              </div>
            </a>

            <a target="_blank" href="https://www.aptugo.com/Downloads">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1678663365/aptugo-removebg-preview_lw9x58.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1678663365/aptugo-removebg-preview_lw9x58.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">Aptugo</div>
              </div>
            </a>
          </div>

          <div title="Equipo" className={theme.footerLinks}>
            <span className={theme.footerTitles}>Equipo</span>

            <NavLink to="/team">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1678483591/grupo_etimc2.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1678483591/grupo_etimc2.png"
                      width="20"
                      height="20"
                    />
                  </picture>
                </div>

                <div title="div">Integrantes</div>
              </div>
            </NavLink>
          </div>

          <div title="Contacto" className={theme.footerLinks}>
            <span className={theme.footerTitles}>Contacto</span>

            <a target="_blank" href="https://www.facebook.com/aptugo">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679790356/%C3%8Dconos%20sociales/facebook_vejlnu.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679790356/%C3%8Dconos%20sociales/facebook_vejlnu.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">Facebook</div>
              </div>
            </a>

            <a target="_blank" href="https://www.instagram.com/aptugo/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/instagram_qdlw4z.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/instagram_qdlw4z.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">Instagram</div>
              </div>
            </a>

            <a target="_blank" href="https://www.linkedin.com/company/aptugo/">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/linkedin_1_aar8j8.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/linkedin_1_aar8j8.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">LinkedIn</div>
              </div>
            </a>

            <a target="_blank" href="https://www.youtube.com/aptugo">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/youtube_zbblck.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/youtube_zbblck.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">YouTube</div>
              </div>
            </a>

            <a target="_blank" href="https://discord.com/invite/Res94WwuB3">
              <div title="div" className={theme.footer_icon_links}>
                <div title="div">
                  <picture>
                    <img
                      src="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/discord_jpgzo0.png"
                      alt="https://res.cloudinary.com/carina-bosio/image/upload/v1679790371/%C3%8Dconos%20sociales/discord_jpgzo0.png"
                      width="25"
                      height="25"
                    />
                  </picture>
                </div>

                <div title="div">Discord</div>
              </div>
            </a>
          </div>
        </div>

        <div title="Footer Inf" className={theme.footer_copyright}>
          © 2023, Creado por ex-alumnos con Aptugo
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginPage
