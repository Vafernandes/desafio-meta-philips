package br.com.api.gerenciamento.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.api.gerenciamento.model.Cliente;
import br.com.api.gerenciamento.model.Endereco;
import br.com.api.gerenciamento.util.ConstantesUtils;

public class ClienteRequestDTO {

	private String nomeCompleto;

	private String cpf;

	@JsonFormat(pattern = ConstantesUtils.DATE_FORMAT_UTIL)
	private Date dataNascimento;

	private List<Endereco> enderecos = new ArrayList<Endereco>();

	public static Cliente toModel(ClienteRequestDTO clienteRequestDTO) {
		return new Cliente(null, clienteRequestDTO.getNomeCompleto(), clienteRequestDTO.getCpf(),
				clienteRequestDTO.getDataNascimento(), clienteRequestDTO.getEnderecos(), null, null);
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}

}
