import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import { Facebook, Instagram, LinkedIn, TipsAndUpdates, YouTube } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FAQsStylesmodulescss from 'dist/css/FAQsStyles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import AuthService from '../services/auth.service'
import { loadClases, searchClases } from '../store/actions/clasesActions'
import { addPreguntas, editPreguntas, loadPreguntas, removePregunta, searchPreguntas } from '../store/actions/preguntasActions'
import { loadRespuestas, searchRespuestas } from '../store/actions/respuestasActions'
import { IPreguntasItem } from '../store/models'
import { IState } from '../store/reducers/index'

const Home: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataPreguntas = {
    Pregunta: '',
    Unidad: '',
  }
  const [Preguntasdata, setPreguntasData] = React.useState<any>(initialDataPreguntas)
  const handlePreguntasChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setPreguntasData({
      ...Preguntasdata,
      [name]: value,
    })
  }
  const [mostrarPaginados, setmostrarPaginados] = React.useState<any>([])
  const [grupoRespuesta, setgrupoRespuesta] = React.useState<any>('')
  const [Buscador, setBuscador] = React.useState<any>('')
  const [cantidadPaginas, setcantidadPaginas] = React.useState<any>(0)
  const [popUpInfo, setpopUpInfo] = React.useState<any>(false)
  const [popUp, setpopUp] = React.useState<any>(false)
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const Clases = useSelector((state: IState) => state.clases).clases
  const clasesData = useSelector((state: IState) => state.clases)
  const Preguntas = useSelector((state: IState) => state.preguntas).preguntas
  const preguntasData = useSelector((state: IState) => state.preguntas)
  const Respuestas = useSelector((state: IState) => state.respuestas).respuestas
  const respuestasData = useSelector((state: IState) => state.respuestas)
  const theme = FAQsStylesmodulescss
  const dispatch = useDispatch()
  const [LoadfromRespuestasloadoptions, setLoadfromRespuestasloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 500,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromRespuestasload = (options) => {
    dispatch(options.searchString ? searchRespuestas(options) : loadRespuestas(options))
  }
  React.useEffect(() => {
    performLoadfromRespuestasload({
      ...LoadfromRespuestasloadoptions,
    })
  }, [LoadfromRespuestasloadoptions])
  const [CargadetablaPreguntasloadoptions, setCargadetablaPreguntasloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 250,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performCargadetablaPreguntasload = (options) => {
    dispatch(options.searchString ? searchPreguntas(options) : loadPreguntas(options))
  }
  React.useEffect(() => {
    performCargadetablaPreguntasload({
      ...CargadetablaPreguntasloadoptions,
    })
  }, [CargadetablaPreguntasloadoptions])
  const [CargadetablaClasesloadoptions, setCargadetablaClasesloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performCargadetablaClasesload = (options) => {
    dispatch(options.searchString ? searchClases(options) : loadClases(options))
  }
  React.useEffect(() => {
    performCargadetablaClasesload({
      ...CargadetablaClasesloadoptions,
    })
  }, [CargadetablaClasesloadoptions])
  const [dialogPreguntasAction, setdialogPreguntasAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  // Theme selection

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  let Resultado = []

  let resultadoFiltrado = []

  React.useEffect(() => {
    let tmp = Resultado.slice(0, 5)
    setmostrarPaginados(tmp)
    let totalElementos = Resultado.length
    let itemsPorPagina = 5
    setcantidadPaginas(Math.ceil(totalElementos / itemsPorPagina))
  }, [Respuestas, grupoRespuesta, Buscador])

  const funcionBuscador = (e) => {
    setBuscador(e.target.value)
  }

  if (!Buscador && !grupoRespuesta) {
    Resultado = Respuestas
  } else if (grupoRespuesta !== '') {
    resultadoFiltrado = Respuestas.filter((Respuesta) => Respuesta.Unidad === grupoRespuesta)
    let temporal = resultadoFiltrado.filter((Respuesta) => Respuesta.Pregunta.toLowerCase().includes(Buscador.toLocaleLowerCase()))
    Resultado = temporal
  } else {
    Resultado = Respuestas.filter((Respuesta) => Respuesta.Pregunta.toLowerCase().includes(Buscador.toLocaleLowerCase()))
  }

  return (
    <React.Fragment>
      <div className={theme.body}>
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

          <div title="Search" className={theme.search}>
            <TextField
              variant="outlined"
              placeholder="Buscar"
              margin="none"
              size="normal"
              className={theme.search_input}
              type="text"
              value={Buscador}
              onChange={(e) => {
                funcionBuscador(e)
              }}
            />
          </div>

          <div title="Centro de ayuda" className={theme.help_center}>
            <div title="Icono de Centro de Ayuda">
              <IconButton
                color="default"
                onClick={(e) => {
                  setpopUp(true)
                }}
              >
                <HelpOutlineRoundedIcon
                  sx={{
                    fontSize: '30px',
                  }}
                />
              </IconButton>
            </div>

            <div title="Icono de proximas funcionalidades">
              <IconButton
                onClick={(e) => {
                  setpopUpInfo(true)
                }}
              >
                <TipsAndUpdates
                  sx={{
                    fontSize: 30,
                    color: '',
                  }}
                />
              </IconButton>
            </div>

            <Dialog
              open={!!popUp}
              onClose={(e) => {
                setpopUp(false)
              }}
              maxWidth={'md'}
            >
              <DialogTitle>
                <Typography variant="h4">Centro de Ayuda</Typography>
              </DialogTitle>

              <DialogContent>
                <picture>
                  <img
                    className={theme.img_popUp}
                    src="/img/retrato-cintura-alta-estudiante-pelirroja-alegre-sueter-amarillo-invitando-al-evento-pago-recomendar-removebg-preview.png"
                    alt="/img/retrato-cintura-alta-estudiante-pelirroja-alegre-sueter-amarillo-invitando-al-evento-pago-recomendar-removebg-preview.png"
                  />
                </picture>
                ¡Estás preparado para formular tu primera pregunta relacionada con la programación low code! La comunidad está aquí para ayudar. Para
                que obtengas las mejores respuestas, te proporcionamos alguna orientación:
                <br></br>
                <br></br>
                Antes de publicar, haz una búsqueda para averiguar si tu pregunta ya ha sido respondida.
                <br></br>
                <br></br>
                Resume el problema:
                <br></br>
                <br></br>✔ incluye detalles sobre tu objetivo,
                <br></br>
                <br></br>✔ describe los resultados esperados y obtenidos,
                <br></br>
                <br></br>✔ incluye cualquier mensaje de error.
              </DialogContent>

              <DialogActions>
                <Button
                  color="primary"
                  onClickCapture={(e) => {
                    setpopUp(false)
                  }}
                  className={theme.btn_close}
                  startIcon={<ClearIcon />}
                >
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={!!popUpInfo}
              onClose={(e) => {
                setpopUpInfo(false)
              }}
              maxWidth={'md'}
            >
              <DialogTitle>
                <Typography variant="h4">Proximas Actualizaciones</Typography>

                <Typography variant="h6">Cositas que se vendran mas adelante 😱😲</Typography>
              </DialogTitle>

              <DialogContent>
                Cambio en la interfaz de cómo se verán las preguntas-respuestas.
                <br />
                <br />
                Posibilidad de agregar imágenes y videos a las respuestas.
                <br />
                <br />
                Sección para que todos vean las preguntas que se hacen y posibilidad de votarlas así darle mayor jerarquía a la misma para ser
                respondida.
                <br />
                <br />
                Sección para poder ver nuestras preguntas.
                <br />
                <br />
                Sección para tips y consejos clave para las cursadas.
              </DialogContent>

              <DialogActions>
                <Button
                  color="primary"
                  onClickCapture={(e) => {
                    setpopUpInfo(false)
                  }}
                  className={theme.btn_close}
                  startIcon={<ClearIcon />}
                >
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div title="Login / Register" className={theme.login_register}>
            {Object.entries(currentUser).length !== 0 && (
              <React.Fragment>
                <a href="/">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClickCapture={(e) => {
                      AuthService.logout()
                    }}
                    className={theme.btn_login}
                  >
                    Cerrar sesión
                  </Button>
                </a>
              </React.Fragment>
            )}

            {Object.entries(currentUser).length === 0 && (
              <React.Fragment>
                <a href="/login">
                  <Button variant="contained" color="inherit" className={theme.btn_login}>
                    Iniciar sesión
                  </Button>
                </a>
              </React.Fragment>
            )}

            <a href="/register">
              <Button variant="contained" color="primary" className={theme.btn_register}>
                Registrarse
              </Button>
            </a>

            <div title="div">
              {currentUser && currentUser.Role === 'Admin' && (
                <React.Fragment>
                  <a href="/tutor">
                    <Button variant="contained" color="inherit" className={theme.btn_admin}>
                      Administracion
                    </Button>
                  </a>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>

        <div title="Main Area" className={theme.mainarea}>
          <div title="Hero" className={theme.hero}>
            <div title="Hero Left" className={theme.hero_content}>
              Aptugo FAQs es un sitio de preguntas y respuestas para alumnos y tutores de la herramienta low code Aptugo. Entre todos, trabajamos
              juntos para crear una biblioteca de respuestas detalladas para todas las preguntas sobre la herramienta y su uso.
              <br />
              Esta página fue creada con Aptugo, por ex-alumnos, teniendo en cuenta preguntas que surgen a menudo al utilizar la herramienta.
              <NavLink to="/register">
                <Button variant="contained" color="inherit" className={theme.hero_button}>
                  Registrate para pertenecer a la comunidad
                </Button>
              </NavLink>
              <div title="Socials Icons" className={theme.socials_icons}>
                <a target="_blank" href="https://www.facebook.com/aptugo">
                  <Facebook
                    sx={{
                      fontSize: 40,
                      color: '#FFFFFF',
                    }}
                  />
                </a>

                <a target="_blank" href="https://www.instagram.com/aptugo/">
                  <Instagram
                    sx={{
                      fontSize: 40,
                      color: '#FFFFFF',
                    }}
                  />
                </a>

                <a target="_blank" href="https://www.linkedin.com/company/aptugo/">
                  <LinkedIn
                    sx={{
                      fontSize: 40,
                      color: '#FFFFFF',
                    }}
                  />
                </a>

                <a target="_blank" href="https://www.youtube.com/aptugo">
                  <YouTube
                    sx={{
                      fontSize: 40,
                      color: '#FFFFFF',
                    }}
                  />
                </a>

                <a target="_blank" href="https://discord.com/invite/Res94WwuB3">
                  <picture>
                    <img className={theme.iconAptugo} src="/img/discord.png" alt="/img/discord.png" width="32" height="32" />
                  </picture>
                </a>

                <a target="_blank" href="https://www.aptugo.com/">
                  <picture>
                    <img className={theme.iconAptugo} src="/img/Fondo blanco.png" alt="/img/Fondo blanco.png" width="37" height="37" />
                  </picture>
                </a>
              </div>
            </div>

            <div title="Hero Right" className={theme.hero_content_right}>
              <div title="div" className={theme.hero_content_right_one}>
                <picture>
                  <img src="/img/pregunta.png" alt="/img/pregunta.png" width="40" height="40" />
                </picture>
                Cualquiera puede formular una pregunta
              </div>

              <div title="div" className={theme.hero_content_right_two}>
                <picture>
                  <img src="/img/pregunta y respuesta.png" alt="/img/pregunta y respuesta.png" width="40" height="40" />
                </picture>
                Los tutores responderán a la brevedad
              </div>

              <div title="div" className={theme.hero_content_right_three}>
                <picture>
                  <img src="/img/buscar2.png" alt="/img/buscar2.png" width="40" height="40" />
                </picture>
                Puedes buscar por palabras claves o filtrar por categorías
              </div>
            </div>
          </div>

          <div title="Hacer Pregunta" className={theme.ask_questions}>
            Explora nuestras preguntas
            <div title="Formular pregunta">
              Formular una pregunta
              <LocalAddDialog
                isOpen={dialogPreguntasAction !== ''}
                onOpen={() => setdialogPreguntasAction('add')}
                onSave={() => setdialogPreguntasAction('')}
                onClose={() => setdialogPreguntasAction('')}
                action={dialogPreguntasAction}
                addOptions={{ title: 'Agregar Pregunta', text: 'Escribe tu Pregunta', button: 'Hacer Pregunta' }}
                editOptions={{ title: 'Editar Pregunta', text: 'Actualizar Pregunta', button: 'Editar' }}
                removeOptions={{ title: '', text: '', button: '' }}
                saveDataHandler={(data: IPreguntasItem) => {
                  if (dialogPreguntasAction === 'delete') {
                    dispatch(removePregunta(data))
                  } else {
                    dialogPreguntasAction === 'add' ? dispatch(addPreguntas(data)) : dispatch(editPreguntas(data))
                  }
                }}
                color="primary"
                data={Preguntasdata}
                initialData={initialDataPreguntas}
                setData={setPreguntasData}
                allowMultipleSubmit={dialogPreguntasAction === 'add'}
              >
                <TextField
                  margin="dense"
                  label="Pregunta"
                  type="text"
                  fullWidth
                  className={'field_Pregunta'}
                  variant="standard"
                  value={Preguntasdata.Pregunta || ''}
                  onChange={handlePreguntasChange('Pregunta')}
                  error={preguntasData?.errField === 'Pregunta'}
                  helperText={preguntasData?.errField === 'Pregunta' && preguntasData.errMessage}
                />

                <TextField
                  select
                  margin="dense"
                  label="Unidad"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={Preguntasdata.Unidad}
                  onChange={handlePreguntasChange('Unidad')}
                >
                  <MenuItem key="Introducción al curso" value="Introducción al curso">
                    Introducción al curso
                  </MenuItem>
                  <MenuItem key="Stack Tecnológico" value="Stack Tecnológico">
                    Stack Tecnológico
                  </MenuItem>
                  <MenuItem key="Base de datos" value="Base de datos">
                    Base de datos
                  </MenuItem>
                  <MenuItem key="APIs" value="APIs">
                    APIs
                  </MenuItem>
                  <MenuItem key="Elementos basicos" value="Elementos basicos">
                    Elementos basicos
                  </MenuItem>
                  <MenuItem key="Estilos básicos" value="Estilos básicos">
                    Estilos básicos
                  </MenuItem>
                  <MenuItem key="Maquetación" value="Maquetación">
                    Maquetación
                  </MenuItem>
                  <MenuItem key="Elementos Avanzados" value="Elementos Avanzados">
                    Elementos Avanzados
                  </MenuItem>
                  <MenuItem key="Estilos Avanzados" value="Estilos Avanzados">
                    Estilos Avanzados
                  </MenuItem>
                  <MenuItem key="Código fuente en Aptugo" value="Código fuente en Aptugo">
                    Código fuente en Aptugo
                  </MenuItem>
                  <MenuItem key=" GIT" value=" GIT">
                    {' '}
                    GIT
                  </MenuItem>
                  <MenuItem key=" Clase de consulta" value=" Clase de consulta">
                    {' '}
                    Clase de consulta
                  </MenuItem>
                  <MenuItem key="Cierre y Deployment" value="Cierre y Deployment">
                    Cierre y Deployment
                  </MenuItem>
                  <MenuItem key=" Errores" value=" Errores">
                    {' '}
                    Errores
                  </MenuItem>
                </TextField>
              </LocalAddDialog>
            </div>
          </div>

          <div title="div" className={theme.divFiltrado}>
            <div title="div">
              <div title="Filtrado">
                <span className={theme.category}>Buscar por Categorías (temas de las clases)</span>
              </div>
            </div>

            <div title="div" className={theme.class_types}>
              <Button
                color="primary"
                onClickCapture={(e) => {
                  setgrupoRespuesta('')
                }}
                className={theme.class}
              >
                Todas
              </Button>
              {Clases.map((cadaClase, index) => {
                return (
                  <React.Fragment key={index}>
                    <Button
                      color="primary"
                      onClickCapture={(e) => {
                        setgrupoRespuesta(e.target.textContent)
                      }}
                      className={theme.class}
                    >
                      {cadaClase.nombreClase}
                    </Button>
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          <div title="Preguntas y respuestas" className={theme.container_preguntas_y_respuestas}>
            {mostrarPaginados.map((objetoRespuesta, index) => {
              return (
                <React.Fragment key={index}>
                  <Accordion
                    sx={{
                      padding: '25',
                    }}
                    className={theme.section_preguntas_y_respuestas}
                  >
                    <AccordionSummary
                      sx={{
                        backgroundColor: 'rgba(79, 106, 191, 0.5)',

                        color: 'white',
                      }}
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            color: 'white',
                          }}
                        />
                      }
                    >
                      {objetoRespuesta.Pregunta}
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        backgroundColor: 'rgba(255, 96, 61, 0.2)',

                        color: '#000000',
                      }}
                    >
                      {objetoRespuesta.Respuesta}
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              )
            })}
          </div>

          <div title="Paginacion" className={theme.div_pagination}>
            <Pagination
              count={cantidadPaginas}
              color={'standard'}
              variant={'text'}
              onChange={(e, page) => {
                let totalElementos = Resultado.length
                let itemsPorPagina = 5
                setcantidadPaginas(Math.ceil(totalElementos / itemsPorPagina))
                let itemsParaOmitir = (page - 1) * itemsPorPagina
                var resultadoPorPagina = Resultado.slice(itemsParaOmitir, itemsPorPagina + itemsParaOmitir)
                setmostrarPaginados(resultadoPorPagina)
              }}
              shape={'circular'}
              size={'medium'}
            />
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

export default Home
