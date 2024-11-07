import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import blue from '@mui/material/colors/blue'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FAQsStylesmodulescss from 'dist/css/FAQsStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AuthService from '../services/auth.service'
import { mergeClasses } from '../services/utils'
import { addUsers, editUsers } from '../store/actions/usersActions'
import { IState } from '../store/reducers/index'

const aptugotheme = createTheme({
  palette: {
    primary: blue,
  },
})

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
const Register: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = mergeClasses(baseClasses, localStyles)
  const initialDataUsers = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Role: '',
  }
  const [Usersdata, setUsersData] = React.useState<any>(initialDataUsers)
  const handleUsersChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setUsersData({
      ...Usersdata,
      [name]: value,
    })
  }
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const [registerError, setregisterError] = React.useState<any>(null)
  const [fieldsNull, setfieldsNull] = React.useState<any>(false)
  const theme = FAQsStylesmodulescss
  const dispatch = useDispatch()

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  // Theme selection

  const listaBlanca = ['damiancazal21@gmail.com', 'caribosio72@gmail.com']

  const usersData = useSelector((state: IState) => state.users)

  const handleRegister = () => {
    const data = { ...Usersdata }
    console.log(data)

    if (listaBlanca.includes(data.Email)) {
      data.Role = 'Admin'
    } else {
      data.Role = 'User'
    }
    if (data.FirstName && data.LastName && data.Email && data.Password) {
      props.history.push('/login')
      setfieldsNull(false)
    } else {
      setfieldsNull(true)
    }

    if (data.FirstName && data.LastName && data.Email && data.Password) {
      if (data._id) {
        dispatch(editUsers(data as any))
      } else {
        dispatch(addUsers(data as any))
      }
    }
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.registerBody}>
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
            <Container className={theme.registerContainer} maxWidth="md">
              <picture>
                <img src="/img/Logo_Final_sin_fondo.png" alt="/img/Logo_Final_sin_fondo.png" width="202" height="55" />
              </picture>

              <div title="Register Box" className={theme.registerContent}>
                <div title="Heading" className={theme.registerHeading}>
                  <Typography variant="h3">Registro</Typography>

                  <Typography variant="body1">Ingresá tus datos</Typography>
                </div>

                {registerError && (
                  <React.Fragment>
                    <Alert variant="standard" severity="error">
                      {registerError}
                    </Alert>
                  </React.Fragment>
                )}

                {fieldsNull && (
                  <React.Fragment>
                    <Alert variant="standard" severity="error">
                      No Se Permiten Campos Vacios
                    </Alert>
                  </React.Fragment>
                )}

                <div title="Campos" className={theme.divInputs}>
                  <TextField
                    margin="normal"
                    label="Nombre"
                    type="text"
                    fullWidth
                    className={theme.registerInput}
                    variant="outlined"
                    value={Usersdata.FirstName || ''}
                    onChange={handleUsersChange('FirstName')}
                    error={usersData?.errField === 'FirstName'}
                    helperText={usersData?.errField === 'FirstName' && usersData.errMessage}
                  />

                  <TextField
                    margin="normal"
                    label="Apellido"
                    type="text"
                    fullWidth
                    className={theme.registerInput}
                    variant="outlined"
                    value={Usersdata.LastName || ''}
                    onChange={handleUsersChange('LastName')}
                    error={usersData?.errField === 'LastName'}
                    helperText={usersData?.errField === 'LastName' && usersData.errMessage}
                  />

                  <TextField
                    margin="normal"
                    label="Correo electrónico"
                    type="text"
                    fullWidth
                    className={theme.registerInput}
                    variant="outlined"
                    value={Usersdata.Email || ''}
                    onChange={handleUsersChange('Email')}
                    error={usersData?.errField === 'Email'}
                    helperText={usersData?.errField === 'Email' && usersData.errMessage}
                  />

                  <TextField
                    margin="normal"
                    label="Contraseña"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={Usersdata.Password}
                    onChange={handleUsersChange('Password')}
                    error={usersData?.errField === 'Password'}
                    helperText={usersData?.errField === 'Password' && usersData.errMessage}
                  />
                </div>

                <div title="Boton">
                  <Button variant="contained" color="primary" onClickCapture={handleRegister} className={theme.registerBtn}>
                    Registrarse
                  </Button>
                </div>
              </div>

              <div title="Login Area" className={theme.sectionLogin}>
                ¿Tenés una cuenta?
                <a href="/Login">
                  <span className={theme.loginLink}>¡Iniciá sesión!</span>
                </a>
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

export default Register
