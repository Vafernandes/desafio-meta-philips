package br.com.api.gerenciamento.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.api.gerenciamento.model.Cliente;
import br.com.api.gerenciamento.util.ConstantesUtils;

public class ClienteResponseDTO {

	private Integer id;
	private String nomeCompleto;
	private String cpf;

	@JsonFormat(pattern = ConstantesUtils.DATE_FORMAT_UTIL)
	private Date dataNascimento;

	@JsonFormat(pattern = ConstantesUtils.DATE_TIME_FORMAT_UTIL)
	private Date dataCriacao;

	@JsonFormat(pattern = ConstantesUtils.DATE_TIME_FORMAT_UTIL)
	private Date dataAtualizacao;

	public ClienteResponseDTO(Integer id, String nomeCompleto, String cpf, Date dataNascimento, Date dataCriacao,
			Date dataAtualizacao) {
		super();
		this.id = id;
		this.nomeCompleto = nomeCompleto;
		this.cpf = cpf;
		this.dataNascimento = dataNascimento;
		this.dataCriacao = dataCriacao;
		this.dataAtualizacao = dataAtualizacao;
	}

	public static ClienteResponseDTO fromModel(Cliente cliente) {
		return new ClienteResponseDTO(cliente.getId(), cliente.getNomeCompleto(), cliente.getCpf(),
				cliente.getDataNascimento(), cliente.getDataCriacao(), cliente.getDataAtualizacao());
	}

	public static List<ClienteResponseDTO> fromModel(List<Cliente> clientes) {
		List<ClienteResponseDTO> clienteResponseDTOs = new ArrayList<ClienteResponseDTO>();
		for (Cliente cliente : clientes) {
			clienteResponseDTOs.add(fromModel(cliente));
		}
		return clienteResponseDTOs;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public Date getDataAtualizacao() {
		return dataAtualizacao;
	}

	public void setDataAtualizacao(Date dataAtualizacao) {
		this.dataAtualizacao = dataAtualizacao;
	}

}
