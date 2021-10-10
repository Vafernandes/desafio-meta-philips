package br.com.api.gerenciamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.gerenciamento.model.Endereco;
import br.com.api.gerenciamento.repository.EnderecoRepository;

@Service
public class EnderecoService {

	@Autowired
	private EnderecoRepository enderecoRepository;
	
	public Endereco salvar(Endereco endereco) {
		return enderecoRepository.save(endereco);
	}
	
	public void deletar(Integer id) {
		enderecoRepository.deleteById(id);
	}
	
	public List<Endereco> listarTodosEnderecosDeUmCliente(Integer clienteId) {
		List<Endereco> enderecosDeUmCliente = enderecoRepository.findByClienteId(clienteId);
		
		return enderecosDeUmCliente;
	}
	
	public Endereco buscarPorId(Integer id) {
		Optional<Endereco> endereco = enderecoRepository.findById(id);
		return endereco.get();
	}

	public Endereco atualizar(Endereco enderecoRequest) {
		
		if(enderecoRequest.getId() == null) {
			salvar(enderecoRequest);
		} 
		
		Endereco enderecoExisteParaAtualizar = buscarPorId(enderecoRequest.getId());
		
		enderecoExisteParaAtualizar = enderecoRequest;
		
		return enderecoRepository.save(enderecoExisteParaAtualizar);
	}

}
