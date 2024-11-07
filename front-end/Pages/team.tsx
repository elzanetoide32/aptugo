import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import { Facebook, GitHub, Instagram, LinkedIn } from '@mui/icons-material'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import FAQsStylesmodulescss from 'dist/css/FAQsStyles.module.scss'
import { NavLink } from 'react-router-dom'
import AuthService from '../services/auth.service'

const Team: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const theme = FAQsStylesmodulescss

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.bodyTeam}>
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

        <div title="div" className={theme.fondoTeam}>
          <Typography variant="h4">
            <span className={theme.roles}>Desarrolladores</span>
          </Typography>

          <div title="Desarrolladores" className={theme.team}>
            <div title="Damián Casal" className={theme.ourTeam}>
              <div title="Picture" className={theme.picture}>
                <picture>
                  <img className={theme.image} src="/img/Damián_Cazal-removebg-preview.png" alt="/img/Damián_Cazal-removebg-preview.png" />
                </picture>
              </div>

              <div title="Team Content" className={theme.teamContent}>
                <Typography variant="h4">
                  <span className={theme.name}>Damián Cazal</span>
                </Typography>

                <Typography variant="h4">
                  <span className={theme.title}>
                    Desarrollador de Aptugo <br></br> BackEnd - FrontEnd
                  </span>
                </Typography>
              </div>

              <List className={theme.social}>
                <a target="_blank" href="https://www.facebook.com/damian.cazal">
                  <Facebook color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/damian-jean-franco-cazal-860019155/
"
                >
                  <LinkedIn color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a target="_blank" href="https://github.com/DamianCazal">
                  <GitHub color="inherit" className={theme.link_icon} sx={{}} />
                </a>

                <NavLink className={theme.link} to="/team">
                  <Instagram color="inherit" className={theme.linkIcon} sx={{}} />
                </NavLink>
              </List>
            </div>

            <div title="Carina Bosio" className={theme.ourTeam}>
              <div title="Picture" className={theme.picture}>
                <picture>
                  <img className={theme.image} src="/img/Carina Bosio-removebg-preview.png" alt="/img/Carina Bosio-removebg-preview.png" />
                </picture>
              </div>

              <div title="Team Content" className={theme.teamContent}>
                <Typography variant="h4">
                  <span className={theme.name}>Carina Bosio</span>
                </Typography>

                <Typography variant="h4">
                  <span className={theme.title}>
                    Desarrollador de Aptugo <br></br> FrontEnd
                  </span>
                </Typography>
              </div>

              <List className={theme.social}>
                <a target="_blank" href="https://www.facebook.com/CarinaBosio">
                  <Facebook color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a target="_blank" href="https://www.linkedin.com/in/carina-susana-bosio-73621215b/">
                  <LinkedIn color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a target="_blank" href="https://github.com/CariBosio">
                  <GitHub color="inherit" className={theme.link_icon} sx={{}} />
                </a>

                <a target="_blank" href="https://www.instagram.com/carinasbosio/">
                  <Instagram color="inherit" className={theme.linkIcon} sx={{}} />
                </a>
              </List>
            </div>
          </div>

          <Typography variant="h4">
            <span className={theme.roles}>Colaboradores</span>
          </Typography>

          <div title="Colaboradores" className={theme.team}>
            <div title="Horacio Maciel de Lima" className={theme.ourTeam}>
              <div title="Picture" className={theme.picture}>
                <picture>
                  <img className={theme.image} src="/img/Horacio-removebg-preview.png" alt="/img/Horacio-removebg-preview.png" />
                </picture>
              </div>

              <div title="Team Content" className={theme.teamContent}>
                <Typography variant="h4">
                  <span className={theme.name}>Horacio Maciel de Lima</span>
                </Typography>

                <Typography variant="h4">
                  <span className={theme.title}>Desarrollador de Aptugo</span>
                </Typography>
              </div>

              <List className={theme.social}>
                <a target="_blank" href="https://www.facebook.com/carloshoraciomacieldelima">
                  <Facebook color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/horacio-carlos-maciel-de-lima/
"
                >
                  <LinkedIn color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a target="_blank" href="https://github.com/carlos2010maciel">
                  <GitHub color="inherit" className={theme.link_icon} sx={{}} />
                </a>

                <a target="_blank" href="https://www.instagram.com/carlosmacieldelima/">
                  <Instagram color="inherit" className={theme.linkIcon} sx={{}} />
                </a>
              </List>
            </div>

            <div title="Daniela Francesetti" className={theme.ourTeam}>
              <div title="Picture" className={theme.picture}>
                <picture>
                  <img className={theme.image} src="/img/Daniela-removebg-preview.png" alt="/img/Daniela-removebg-preview.png" />
                </picture>
              </div>

              <div title="Team Content" className={theme.teamContent}>
                <Typography variant="h4">
                  <span className={theme.name}>Daniela Francesetti</span>
                </Typography>

                <Typography variant="h4">
                  <span className={theme.title}>Desarrollador de Aptugo</span>
                </Typography>
              </div>

              <List className={theme.social}>
                <a target="_blank" href="https://www.facebook.com/DanielaYael71317/">
                  <Facebook color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/daniela-yael-francesetti-493a441a7/
"
                >
                  <LinkedIn color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <NavLink className={theme.link} to="/team">
                  <GitHub color="inherit" className={theme.link_icon} sx={{}} />
                </NavLink>

                <a target="_blank" href="https://www.instagram.com/yaelina_71317/">
                  <Instagram color="inherit" className={theme.linkIcon} sx={{}} />
                </a>
              </List>
            </div>

            <div title="Jorge Jara" className={theme.ourTeam}>
              <div title="Picture" className={theme.picture}>
                <picture>
                  <img className={theme.image} src="/img/Jorge-removebg-preview.png" alt="/img/Jorge-removebg-preview.png" />
                </picture>
              </div>

              <div title="Team Content" className={theme.teamContent}>
                <Typography variant="h4">
                  <span className={theme.name}>Jorge Jara</span>
                </Typography>

                <Typography variant="h4">
                  <span className={theme.title}>Desarrollador de Aptugo</span>
                </Typography>
              </div>

              <List className={theme.social}>
                <NavLink className={theme.link} to="/team">
                  <Facebook color="inherit" className={theme.linkIcon} sx={{}} />
                </NavLink>

                <a target="_blank" href="https://www.linkedin.com/in/jorge-jara-538a9bab/">
                  <LinkedIn color="inherit" className={theme.linkIcon} sx={{}} />
                </a>

                <a target="_blank" href="https://github.com/jorgehara">
                  <GitHub color="inherit" className={theme.link_icon} sx={{}} />
                </a>

                <NavLink className={theme.link} to="/team">
                  <Instagram color="inherit" className={theme.linkIcon} sx={{}} />
                </NavLink>
              </List>
            </div>

            <div title="Cristian Garcia Varacca" className={theme.ourTeam}>
              <div title="Picture" className={theme.picture}>
                <picture>
                  <img className={theme.image} src="/img/usuario.png" alt="/img/usuario.png" />
                </picture>
              </div>

              <div title="Team Content" className={theme.teamContent}>
                <Typography variant="h4">
                  <span className={theme.name}>Cristian Garcia Varacca</span>
                </Typography>

                <Typography variant="h4">
                  <span className={theme.title}>Desarrollador de Aptugo</span>
                </Typography>
              </div>

              <List className={theme.social}>
                <NavLink className={theme.link} to="/team">
                  <Facebook color="inherit" className={theme.linkIcon} sx={{}} />
                </NavLink>

                <NavLink className={theme.link} to="/team">
                  <LinkedIn color="inherit" className={theme.linkIcon} sx={{}} />
                </NavLink>

                <NavLink className={theme.link} to="/team">
                  <GitHub color="inherit" className={theme.link_icon} sx={{}} />
                </NavLink>

                <NavLink className={theme.link} to="/team">
                  <Instagram color="inherit" className={theme.linkIcon} sx={{}} />
                </NavLink>
              </List>
            </div>
          </div>
        </div>
      </div>

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

export default Team
