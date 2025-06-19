import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTable } from "simple-datatables";
import { LANGUAGE_DATATABLE } from 'src/app/core/constants/languages-datatables';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CONSTANTES_LAYOUT } from 'src/app/core/constants/constantes-label';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioInterface } from 'src/app/core/interfaces/usuario/usuario-interface';
import { FunctionsGlobalsService } from 'src/app/core/services/functionsGlobals/functionsglobals.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { MENSAJES_APP } from 'src/app/core/constants/mensajes-app';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/core/models/usuario/usuario.model';
import { CODES_HTTP_API } from 'src/app/core/constants/codes-http';
import { ListaSelector } from 'src/app/core/interfaces/lista-selector/lista-selector-interface';
import { END_POINT_API } from 'src/app/core/constants/end-point-api';
import { ListaSelectorService } from 'src/app/core/services/lista-selector/lista-selector.service';
import { GeneralModel } from 'src/app/core/models/general.model';
import { ParametrosSelectorMenu } from 'src/app/core/models/parametros-selector-menu/parametros-selector-menu.model';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('modalUsuario', { static: false }) modalUsuario: ElementRef = {} as ElementRef;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  public dataTable!: DataTable;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  datatableElement: DataTableDirective;
  dtInstance: DataTables.Api;


  readonlyUsername = false;
  listaUsuarios: any; 
  listaRolesUsuario: Array<ListaSelector> = [];; 
  titleModal: string = CONSTANTES_LAYOUT.tituloModal;
  public formsUsuario: UntypedFormGroup = new UntypedFormGroup({});
  public urlApi: string = this.generalModel.urlApi || "";
   
  constructor(private generalModel: GeneralModel, private http: HttpClient, 
    private modalService: NgbModal, 
    private formBuilder: FormBuilder, 
    private listaSelectorService: ListaSelectorService,
    private usuarioService: UsuarioService,
    private functionsGlobalsService: FunctionsGlobalsService,) { }

    
  ngAfterViewInit(): void {
    this.dtTrigger.next(0);  
  }
 
  ngOnInit(): void {
    this.cargarListaRolesUsuario();
    this.formsUsuario = this.formBuilder.group({
      formUusuaId: [''],
      formUNombres: ['', Validators.compose([Validators.required])],
      formUApellidos: ['', Validators.compose([Validators.required])],
      formUsuario: ['', Validators.compose([Validators.required])],
      formUEmail: ['', Validators.compose([Validators.required])],
      formURol: ['', Validators.compose([Validators.required])],
      formUContrasena: [''],
      formUConfiContrasena: [''],
    });

    const that = this;
    this.dtOptions = {
      paging: true,
        ordering: true,
        info: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange : true,
      serverSide: true,
      processing: true,
      language: LANGUAGE_DATATABLE,
      destroy:true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(this.urlApi + 'usuario/', dataTablesParameters, {}).subscribe(resp => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      drawCallback: function(settings) {
      },
      columns: [
        { title: "usuario", data: 'usuaUsername' }, 
        { title: "email", data: 'usuaEmail' },
        { 
          title: "Acciones", defaultContent: "<button type='button' title='Editar Usuario' alt='Editar Usuario' class='form btn btn-success btn-xs mr-1 editarUsuario'><i class='feather icon-edit'></i></button>"+
          "<button type='button' title='Eliminar Usuario' alt='Eliminar Usuario' class='form btn btn-danger btn-xs eliminarUsuario'><i class='feather icon-trash'></i></button>",
          
          createdCell: function(cell: any, cellData: any, rowData: any, rowIndex: any, colIndex: any) {
            $(cell).find('.editarUsuario').click(function() {
              that.cargarInformacionUsuario(rowData.usuaId);              
            });
            $(cell).find('.eliminarUsuario').click(function() {
              that.eliminarUsuario(rowData, that);
            });
          }
        }   
      ]
    };    
  }

  rerender(): void {
    try {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
         dtInstance.ajax.reload();
      });
    } catch (err) {
      console.log(err);
    }
  }

  eliminarUsuario(rowData: any, that: any){
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        that.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
        that.usuarioService.eliminarUsuarioPorId(rowData.usuaId).subscribe({ next: (responseRequest: any) => {       
            that.functionsGlobalsService.closeAlertRequest();               
            that.functionsGlobalsService.showMessageRequest(1, MENSAJES_APP.tituloAlerta || "", responseRequest.message || "", responseRequest.status, null);
            if(responseRequest.status == 200){   
              that.rerender();
            }else{}
          }, error: (responseRequestError: any) => { 
            that.functionsGlobalsService.closeAlertRequest();
            if(responseRequestError){        
              that.functionsGlobalsService.showMessageErrorAlert("ngOnInit()", "eliminarUsuarioPorId()", responseRequestError);
            }                
          }, complete: () => { 
            //this.functionsGlobalsService.closeAlertRequest();     
          } 
        }); 
      } 
    })
  }

  cargarInformacionUsuario(usuarioId: string){
    this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
    this.usuarioService.consultarUsuarioPorId(usuarioId).subscribe({ next: (responseRequest) => {       
        this.functionsGlobalsService.closeAlertRequest();               
        if(responseRequest.status == 200){   
          this.formsUsuario.reset();
          let usuario: UsuarioInterface = responseRequest.result;                
          this.formsUsuario.controls['formUusuaId'].setValue(usuario.usuaId);
          this.formsUsuario.controls['formUNombres'].setValue(usuario.usuaNombres);
          this.formsUsuario.controls['formUApellidos'].setValue(usuario.usuaApellidos);
          this.formsUsuario.controls['formUsuario'].setValue(usuario.usuaUsername);
          this.formsUsuario.controls['formUEmail'].setValue(usuario.usuaEmail); 
          this.formsUsuario.controls['formURol'].setValue(usuario.rolId); 
          this.titleModal += "Usuario";
          this.readonlyUsername = true;
          this.abrirModal(this.modalUsuario); 
        }else{
          this.functionsGlobalsService.showMessageRequest(1, MENSAJES_APP.tituloAlerta || "", responseRequest.message || "", responseRequest.status, null);
        }
      }, error: (responseRequestError) => { 
        this.functionsGlobalsService.closeAlertRequest();
        if(responseRequestError){        
          this.functionsGlobalsService.showMessageErrorAlert("cargarInformacionUsuario()", "consultarUsuarioPorId()", responseRequestError);
        }                
      }, complete: () => { 
        //this.functionsGlobalsService.closeAlertRequest();     
      } 
    });      
  }

  guardarFormUsuario(formsUsuario :FormGroup){
    let listaErrores: Array<string> = new Array();
    if(formsUsuario?.value?.formUContrasena != formsUsuario?.value?.formUConfiContrasena){
      listaErrores.push(MENSAJES_APP.contrasenasDiferentes);
    }
    if(listaErrores.length == 0){
      let usuarioModel: UsuarioModel = new UsuarioModel();
      usuarioModel.usuaId = formsUsuario?.value?.formUusuaId;
      usuarioModel.usuaUsername = formsUsuario?.value?.formUsuario;
      usuarioModel.usuaNombres = formsUsuario?.value?.formUNombres;
      usuarioModel.usuaEmail = formsUsuario?.value?.formUEmail;
      usuarioModel.usuaPassword = formsUsuario?.value?.formUContrasena;
      usuarioModel.usuaApellidos = formsUsuario?.value?.formUApellidos;   
      usuarioModel.rolId = formsUsuario?.value?.formURol;
      this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
      this.usuarioService.guardarUsuario(usuarioModel).subscribe({next: (responseRequest) => {       
          this.functionsGlobalsService.closeAlertRequest();               
          this.functionsGlobalsService.showMessageRequest(1, MENSAJES_APP.tituloAlerta || "", responseRequest.message || "", responseRequest.status, null);
          if(responseRequest.status == 200){   
            this.rerender();
            this.formsUsuario.reset();
            this.modalService.dismissAll();
          }
        }, error: (responseRequestError) => { 
          this.functionsGlobalsService.closeAlertRequest();
          if(responseRequestError){        
            this.functionsGlobalsService.showMessageErrorAlert("guardarFormUsuario()", "guardarUsuario()", responseRequestError);
          }                
        }, complete: () => { 
          //this.functionsGlobalsService.closeAlertRequest();     
        } 
      });
    }else{
      this.functionsGlobalsService.showMessageRequest(1, MENSAJES_APP.tituloAlerta || "", listaErrores[0] || "", CODES_HTTP_API.CODE_HTTP_BAD_REQUEST, null);
    }
  }

  abrirModal(content: ElementRef<any>) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.formsUsuario.reset();
    }).catch((res) => {});
  }

  abrirModalTemplateRef(content: TemplateRef<any>) {
    this.readonlyUsername = false;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {      
      this.formsUsuario.reset();
    }).catch((res) => {});
  }

  cargarListaRolesUsuario(): void{
    this.functionsGlobalsService.showMessageRequest(2, "", "", 0, "");
    this.listaSelectorService.consultarListaSelector(END_POINT_API.END_POINT_API_ROLES_USUARIO, new ParametrosSelectorMenu()).subscribe({ next: (responseRequest) => {       
        if(responseRequest.status == 200){
          responseRequest.result.unshift({"label": "Seleccione", "value": ""});
          this.listaRolesUsuario = responseRequest.result;
        }
      }, error: (responseRequestError) => { 
        this.functionsGlobalsService.closeAlertRequest();
        if(responseRequestError){        
          this.functionsGlobalsService.showMessageErrorAlert("cargarListaRolesUsuario()", "consultarListaSelector()", responseRequestError);
        }                
      }, complete: () => { 
        this.functionsGlobalsService.closeAlertRequest();     
      } 
    });
  }
}
