import React, { FunctionComponent } from 'react'
import baseClasses from './layout.module.scss'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Backofficemodulescss from 'dist/css/Backoffice.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Sidebar from '../components/Sidebar/Sidebar'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import { addClases, editClases, loadClases, removeClase, searchClases } from '../store/actions/clasesActions'
import { IClasesItem } from '../store/models'
import { IState } from '../store/reducers/index'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Clasesporunidad: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const initialDataClases = {
    nombreClase: '',
  }
  const [Clasesdata, setClasesData] = React.useState<any>(initialDataClases)
  const handleClasesChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setClasesData({
      ...Clasesdata,
      [name]: value,
    })
  }
  const clasesData = useSelector((state: IState) => state.clases)
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const theme = Backofficemodulescss
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForClases = (event, field = null) => {
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
    dispatch(options.searchString ? searchClases(options) : loadClases(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogClasesAction, setdialogClasesAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchClases(options) : loadClases(options))
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
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Clases (categorías)</Typography>
              </div>

              <Paper square>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Buscar por clase"
                      margin="dense"
                      size="small"
                      className={theme.extensibleInput}
                      type="text"
                      onChange={searchForClases}
                    />

                    <LocalAddDialog
                      isOpen={dialogClasesAction !== ''}
                      onOpen={() => setdialogClasesAction('add')}
                      onSave={() => setdialogClasesAction('')}
                      onClose={() => setdialogClasesAction('')}
                      action={dialogClasesAction}
                      addOptions={{ title: 'Agregar Clase', text: 'Ingresar una Clase', button: 'Agregar' }}
                      editOptions={{ title: 'Editar Clase', text: 'Actualizar Clase', button: 'Editar' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IClasesItem) => {
                        if (dialogClasesAction === 'delete') {
                          dispatch(removeClase(data))
                        } else {
                          dialogClasesAction === 'add' ? dispatch(addClases(data)) : dispatch(editClases(data))
                        }
                      }}
                      color="primary"
                      data={Clasesdata}
                      initialData={initialDataClases}
                      setData={setClasesData}
                      allowMultipleSubmit={dialogClasesAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="nombreClase"
                        type="text"
                        fullWidth
                        className={'field_nombreClase'}
                        variant="standard"
                        value={Clasesdata.nombreClase || ''}
                        onChange={handleClasesChange('nombreClase')}
                        error={clasesData?.errField === 'nombreClase'}
                        helperText={clasesData?.errField === 'nombreClase' && clasesData.errMessage}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Nombre de la Unidad', 'Actions']}
                      tableData={clasesData.foundclases.length ? clasesData.foundclases : (clasesData.clases as any)}
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
                      <Field value={(fieldData: any) => fieldData.nombreClase} />

                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setClasesData(e.element)
                            setdialogClasesAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeClase(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Clasesporunidad
