import { useState, useEffect } from 'react';
import './styles.css'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { apiClientes } from '../../services/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

import { useForm } from "react-hook-form";

const TabelaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => console.log(data);

    useEffect(() => {
        carregarDadosApi()
    }, []);

    const carregarDadosApi = async () => {
        const response = await apiClientes.get();
        setClientes(response.data)
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text" />
            </div>
        );
    }

    const editProduct = () => { }
    const confirmDeleteProduct = () => { }

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    }

    return (
        <div className="p-d-flex p-flex-column" style={{ margin: 50 }}>
            <Card className="p-mb-2">
                <Button
                    label="Cadastrar novo cliente"
                    className="p-button-raised p-button-success"
                    onClick={() => setShowDialog(true)}
                />
            </Card>

            <Card className="p-mb-2">
                <DataTable value={clientes}>
                    <Column field="nomeCompleto" header="Nome Completo"></Column>
                    <Column field="cpf" header="CPF"></Column>
                    <Column field="dataNascimento" header="Data de Nascimento"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </Card>

            <Dialog header="Cadastrar" visible={showDialog} style={{ width: '70vw' }} footer={renderFooter('showDialog')} onHide={() => setShowDialog(false)}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-d-flex p-flex-column marginInput">

                        <div className="p-d-flex p-flex-wrap">
                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Nome completo</label>
                                    <InputText  {...register('nomeCompleto')} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">CPF</label>
                                    <InputText {...register('cpf')} />
                                </div>
                            </div>

                            <div className="p-mr-5">
                                <div className="p-d-flex p-flex-column">
                                    <label className="marginLabel">Data de Nascimento</label>
                                    <Calendar {...register('dataNascimento')} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <Button
                        label="Cadastrar"
                        className="p-button-raised p-button-success"
                        type="submit"
                    />
                </form>

            </Dialog>
        </div>
    );
}

export { TabelaClientes }