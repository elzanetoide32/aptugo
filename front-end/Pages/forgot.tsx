import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import Typography from '@mui/material/Typography'
import axios from 'axios'
import _server from 'react-dom/server'
import { NavLink } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import blue from '@mui/material/colors/blue'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import FAQsStylesmodulescss from 'dist/css/FAQsStyles.module.scss'
import { useDispatch } from 'react-redux'
import AuthService from '../services/auth.service'
import { mergeClasses } from '../services/utils'
import { addUsers, editUsers } from '../store/actions/usersActions'

const aptugotheme = createTheme({
  palette: {
    primary: blue,
  },
})

import authHeaders from '../services/auth-header'

const localStyles = {
  mainPanel: { ['@media (min-width:960px)']: { backgroundColor: '#56baec', width: '100%', flexGrow: 1 } },
  loginHolder: { margin: '5rem auto 0', width: '30vw', textAlign: 'center' },
  loginArea: {
    position: 'relative',
    background: 'white',
    padding: '4rem 3rem 2rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    boxShadow: '0px 3px 20px 5px #00000030',
  },
  loginTitle: { textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '0.1rem', color: '#3084af' },
  image: {
    width: '5rem',
    position: 'absolute',
    top: '-2.5rem',
    left: 'calc(15vw - (2.5rem + 2.5px))',
    border: '5px solid white',
    borderRadius: '5rem',
  },
}
const RetrievePassword: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = mergeClasses(baseClasses, localStyles)
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const [userData, setuserData] = React.useState<any>({ _id: null, Password: '' })
  const [recoverSuccess, setrecoverSuccess] = React.useState<any>(null)
  const [recoverError, setrecoverError] = React.useState<any>(null)
  const [userEmail, setuserEmail] = React.useState<any>('')
  const theme = FAQsStylesmodulescss
  const recoverPasswordFormat = (to, extra: any = {}) => {
    const from = extra.from || ''
    const subject = extra.subject || 'Recover Password'
    const messageHtml = InlineLink()
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:4567/api/sendEmail',
      data: {
        name: from,
        email: to,
        messageHtml: messageHtml,
        extra: extra,
        subject: subject,
      },
    }).then((response) => {
      if (response.data.msg === 'success') {
        console.log('Email sent, awesome!')
      } else if (response.data.msg === 'fail') {
        console.log('error', response)
      }
    })
  }
  function InlineLink(emailParameters: any = {}) {
    var _server2 = _interopRequireDefault(_server)
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function renderEmail(emailComponent) {
      var doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
      return `${doctype}${_server2.default.renderToStaticMarkup(emailComponent).replaceAll('/img/', 'https://faqslite.aptugo.com/img/')}`
    }

    return (
      emailParameters.content ||
      renderEmail(
        <div>
          <div title="div">
            <Typography variant="h2">Password reset?</Typography>
            If you requested a password reset, use the link below to complete the process. If you didn't make this request, ignore this email.
            <div title="div">
              <a href="/forgot/**nonce**/**email**">Click here to reset your password</a>
            </div>
          </div>
        </div>
      )
    )
  }
  const dispatch = useDispatch()

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  // Theme selection

  const sendNonce = () => {
    setrecoverSuccess(null)
    setrecoverError(null)
    AuthService.recoverPassword({ email: userEmail, subject: 'Password recovery', message: InlineLink(), name: 'pedro corica' }).then(
      (res) => {
        setrecoverSuccess(`Email sent to ${userEmail}`)
      },
      (error) => {
        setrecoverError(error.response.data.message)
      }
    )
  }

  const saveNewPassword = () => {
    const data = { ...userData }

    if (data._id) {
      dispatch(editUsers(data as any))
    } else {
      dispatch(addUsers(data as any))
    }
  }

  React.useEffect(() => {
    if (props.match.params.nonce) {
      AuthService.checkNonce(props.match.params.nonce, props.match.params.email).then(
        (res) => {
          authHeaders()
          setuserData({ ...userData, _id: res })
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }, [props.match.params.nonce])

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.retrieveBody}>
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
            <Container className={theme.retrieveContainer} maxWidth="md">
              <picture>
                <img src="/img/Logo_Final_sin_fondo.png" alt="/img/Logo_Final_sin_fondo.png" width="202" height="55" />
              </picture>

              <div title="Retrieve Box" className={theme.retrieveContent}>
                {!props.match.params.nonce && (
                  <React.Fragment>
                    <div title="Heading" className={theme.retrieveHeading}>
                      <Typography variant="h4">¿Olvidaste tu contraseña?</Typography>

                      <Typography variant="body1">
                        Ingresá la dirección de correo electrónico asociada con tu cuenta y te enviaremos un correo electrónico con un enlace para
                        restablecer tu contraseña
                      </Typography>

                      {recoverSuccess && (
                        <React.Fragment>
                          <Alert variant="standard" severity="success">
                            {recoverSuccess}
                          </Alert>
                        </React.Fragment>
                      )}

                      {recoverError && (
                        <React.Fragment>
                          <Alert variant="standard" severity="error">
                            {recoverError}
                          </Alert>
                        </React.Fragment>
                      )}
                    </div>

                    <div title="div" className={theme.divInputs}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        label="Correo electrónico"
                        className={theme.retrieveInput}
                        type="text"
                        value={userEmail}
                        onChange={(e) => {
                          setuserEmail(e.target.value)
                        }}
                      />
                    </div>

                    <div title="div">
                      <Button variant="contained" color="primary" onClickCapture={sendNonce} className={theme.retrieveBtn}>
                        Restablecer la contraseña
                      </Button>
                    </div>

                    <div title="div" className={theme.sectionRetrieve}>
                      Volver a&nbsp;
                      <NavLink to="/Login" key="8pJfr4qP">
                        Iniciar sesión
                      </NavLink>
                    </div>
                  </React.Fragment>
                )}

                {props.match.params.nonce && (
                  <React.Fragment>
                    <div title="div" className={theme.regulatedWidth}>
                      <Typography variant="h4">Reset your Password</Typography>

                      <Typography variant="body1">Set your new password in the field below</Typography>

                      <TextField
                        variant="outlined"
                        margin="normal"
                        label="New Password"
                        type="password"
                        value={userData.Password}
                        onChange={(e) => {
                          setuserData({ ...userData, Password: e.target.value })
                        }}
                      />

                      <Button variant="contained" color="primary" onClickCapture={saveNewPassword}>
                        Reset Password!
                      </Button>
                    </div>
                  </React.Fragment>
                )}
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

export default RetrievePassword
