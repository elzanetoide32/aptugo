import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Backofficemodulescss from 'dist/css/Backoffice.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Pagination from '../components/Pagination'
import Sidebar from '../components/Sidebar/Sidebar'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { loadClases, searchClases } from '../store/actions/clasesActions'
import { addPreguntas, editPreguntas, loadPreguntas, removePregunta, searchPreguntas } from '../store/actions/preguntasActions'
import { addRespuestas, editRespuestas, loadRespuestas, removeRepuesta, searchRespuestas } from '../store/actions/respuestasActions'
import { IPreguntasItem, IRespuestasItem } from '../store/models'
import { IState } from '../store/reducers/index'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const PreguntasAResponder: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataRespuestas = {
    Pregunta: '',
    Respuesta: '',
    Unidad: '',
  }
  const [Respuestasdata, setRespuestasData] = React.useState<any>(initialDataRespuestas)
  const handleRespuestasChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setRespuestasData({
      ...Respuestasdata,
      [name]: value,
    })
  }
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
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const theme = Backofficemodulescss
  const [tipoPregunta, settipoPregunta] = React.useState<any>('')
  const [seAgregoRespuesta, setseAgregoRespuesta] = React.useState<any>(false)
  const [datoBorrar, setdatoBorrar] = React.useState<any>(null)
  const Clases = useSelector((state: IState) => state.clases).clases
  const clasesData = useSelector((state: IState) => state.clases)
  const Preguntas = useSelector((state: IState) => state.preguntas).preguntas
  const preguntasData = useSelector((state: IState) => state.preguntas)
  const Respuestas = useSelector((state: IState) => state.respuestas).respuestas
  const respuestasData = useSelector((state: IState) => state.respuestas)
  const dispatch = useDispatch()
  const [LoadfromRespuestasloadoptions, setLoadfromRespuestasloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
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
  const [LoadfromPreguntasloadoptions, setLoadfromPreguntasloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromPreguntasload = (options) => {
    dispatch(options.searchString ? searchPreguntas(options) : loadPreguntas(options))
  }
  React.useEffect(() => {
    performLoadfromPreguntasload({
      ...LoadfromPreguntasloadoptions,
    })
  }, [LoadfromPreguntasloadoptions])
  const [LoadfromClasesloadoptions, setLoadfromClasesloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromClasesload = (options) => {
    dispatch(options.searchString ? searchClases(options) : loadClases(options))
  }
  React.useEffect(() => {
    performLoadfromClasesload({
      ...LoadfromClasesloadoptions,
    })
  }, [LoadfromClasesloadoptions])
  let searchTimeout = null
  const searchForPreguntas = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchPreguntas(options) : loadPreguntas(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogPreguntasAction, setdialogPreguntasAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [dialogRespuestasAction, setdialogRespuestasAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 10,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchPreguntas(options) : loadPreguntas(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

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

  React.useEffect(() => {
    if (datoBorrar) {
      dispatch(removePregunta(datoBorrar))
      setdatoBorrar(null)
    }
  }, [Respuestas])

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
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
          <div title="div" className={theme.back_content}>
            <Container>
              <div title="Cada unidad" className={theme.mainarea}>
                <Typography variant="h5">Buscar por Categorías (temas de las clases)</Typography>

                {Clases.map((Clase, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Button
                        color="inherit"
                        onClickCapture={(e) => {
                          settipoPregunta(Clase.nombreClase)
                          settableloadoptions({
                            ...tableloadoptions,
                            searchString: e.target.textContent,
                            searchField: 'Unidad',
                          })
                        }}
                        className={theme.back_class}
                      >
                        {Clase.nombreClase}
                      </Button>
                    </React.Fragment>
                  )
                })}
              </div>

              <div title="div" className={theme.back_alert}>
                <Alert variant="standard" severity="error">
                  <AlertTitle>Consideración a tener en cuenta al responder las preguntas</AlertTitle>
                  Es importante a la hora de responder una pregunta que la respuesta no tenga faltas de ortografía para poder guardarla correctamente
                  <br />
                  <br />
                  <b>Este errores se arreglaran en futuras versiones de la página</b>
                </Alert>
              </div>

              <div title="Tabla">
                <Container maxWidth="lg">
                  <div title="Head" className={theme.tableHeading}>
                    <Typography variant="h4">Tabla de Preguntas</Typography>
                  </div>

                  <Paper square>
                    <div title="Table Area" className={classes.tableResponsive}>
                      <div title="Table Toolbar" className={theme.tabletoolbar}>
                        <TextField
                          variant="outlined"
                          placeholder="Buscar Pregunta"
                          margin="normal"
                          className={theme.extensibleInput}
                          type="text"
                          onChange={(e) => {
                            searchForPreguntas(e, 'Pregunta')
                          }}
                        />

                        <LocalAddDialog
                          isOpen={dialogPreguntasAction !== ''}
                          onOpen={() => setdialogPreguntasAction('add')}
                          onSave={() => setdialogPreguntasAction('')}
                          onClose={() => setdialogPreguntasAction('')}
                          action={dialogPreguntasAction}
                          addOptions={{ title: 'Agregar Pregunta', text: 'Introducir tu Pregunta', button: 'Agregar' }}
                          editOptions={{ title: 'Editar tu Pregunta', text: 'Actualizar  tuPregunta', button: 'Editar' }}
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

                        <LocalAddDialog
                          hideButton={true}
                          isOpen={dialogRespuestasAction !== ''}
                          onOpen={() => setdialogRespuestasAction('add')}
                          onSave={() => setdialogRespuestasAction('')}
                          onClose={() => setdialogRespuestasAction('')}
                          action={dialogRespuestasAction}
                          addOptions={{ title: 'Añadir Repuesta', text: 'Introducir la Repuesta', button: 'Contestar' }}
                          editOptions={{ title: 'Editar Repuesta', text: 'ActualizarRepuesta', button: 'Editar' }}
                          removeOptions={{ title: '', text: '', button: '' }}
                          saveDataHandler={(data: IRespuestasItem) => {
                            if (dialogRespuestasAction === 'delete') {
                              dispatch(removeRepuesta(data))
                            } else {
                              dialogRespuestasAction === 'add' ? dispatch(addRespuestas(data)) : dispatch(editRespuestas(data))
                            }
                          }}
                          color="secondary"
                          data={Respuestasdata}
                          initialData={initialDataRespuestas}
                          setData={setRespuestasData}
                          allowMultipleSubmit={dialogRespuestasAction === 'add'}
                        >
                          <TextField
                            margin="dense"
                            label="Pregunta"
                            type="text"
                            fullWidth
                            className={'field_Pregunta'}
                            variant="standard"
                            value={Respuestasdata.Pregunta || ''}
                            onChange={handleRespuestasChange('Pregunta')}
                            error={respuestasData?.errField === 'Pregunta'}
                            helperText={respuestasData?.errField === 'Pregunta' && respuestasData.errMessage}
                          />

                          <TextField
                            margin="dense"
                            label="Respuesta"
                            type="text"
                            fullWidth
                            multiline
                            className={'field_Respuesta'}
                            variant="standard"
                            value={Respuestasdata.Respuesta}
                            onChange={handleRespuestasChange('Respuesta')}
                          />

                          <TextField
                            select
                            margin="dense"
                            label="Unidad"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={Respuestasdata.Unidad}
                            onChange={handleRespuestasChange('Unidad')}
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

                      <div title="Body">
                        <Table
                          tableHead={['Preguntas a contestar', 'Unidad', 'Actions']}
                          tableData={preguntasData.foundpreguntas.length ? preguntasData.foundpreguntas : (preguntasData.preguntas as any)}
                          orderBy={tableloadoptions.sort.field}
                          order={tableloadoptions.sort.method}
                          onRequestSort={(event, property) => {
                            settableloadoptions({
                              ...tableloadoptions,
                              sort: {
                                field: property,
                                method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                              },
                            })
                          }}
                        >
                          <Field value={(fieldData: any) => fieldData.Pregunta} />

                          <Field value={(fieldData: any) => fieldData.Unidad} />

                          <div className={classes.actionsArea}>
                            <IconButton
                              aria-label="QuestionAnswer"
                              color="primary"
                              onClickCapture={(e: any) => {
                                setRespuestasData(e.element)
                                setdialogRespuestasAction('add')
                              }}
                            >
                              <QuestionAnswerIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                              aria-label="edit"
                              color="primary"
                              onClickCapture={(e: any) => {
                                setPreguntasData(e.element)
                                setdialogPreguntasAction('edit')
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                              aria-label="delete"
                              color="primary"
                              onClickCapture={(e: any) => {
                                dispatch(removePregunta(e.element))
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        </Table>

                        <Pagination
                          itemsPerPage={tableloadoptions.limit}
                          currentPage={tableloadoptions.page}
                          setPage={(page) => {
                            settableloadoptions({ ...tableloadoptions, page: page })
                          }}
                          totalItems={preguntasData.totalDocs}
                        />
                      </div>
                    </div>
                  </Paper>
                </Container>
              </div>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default PreguntasAResponder
