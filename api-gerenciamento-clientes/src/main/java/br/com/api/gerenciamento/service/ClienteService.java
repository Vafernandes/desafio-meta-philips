package br.com.api.gerenciamento.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.api.gerenciamento.model.Cliente;
import br.com.api.gerenciamento.model.Endereco;
import br.com.api.gerenciamento.repository.ClienteRepository;
import br.com.api.gerenciamento.service.exception.DataIntegrityException;
import br.com.api.gerenciamento.service.exception.ObjectNotFoundException;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private EnderecoService enderecoService;

	@Transactional
	public Cliente salvar(Cliente cliente) {
		try {
			for (Endereco endereco : cliente.getEnderecos()) {
				endereco.setCliente(cliente);
				enderecoService.salvar(endereco);
			}

			cliente.setId(null);
			cliente.setDataCriacao(new Date());
			cliente.setDataAtualizacao(new Date());

			return clienteRepository.save(cliente);
		} catch (Exception e) {
			throw new DataIntegrityException("Não é possível cadastrar porque o CPF informado já foi cadastrado!");
		}
	}

	public Cliente buscarPorCpf(String cpf) {
		Optional<Cliente> cliente = clienteRepository.findByCpf(cpf);

		if (cliente.isEmpty()) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! CPF: " + cpf + ", Tipo" + Cliente.class.getName());
		}

		return cliente.get();
	}

	public Cliente buscarPorId(Integer id) {
		Optional<Cliente> cliente = clienteRepository.findById(id);

		if (cliente.isEmpty()) {
			throw new ObjectNotFoundException("Objeto não encontrado! Id: " + id + ", Tipo" + Cliente.class.getName());
		}

		return cliente.get();
	}

	public Cliente editar(Cliente clienteRequest) {
		Cliente cliente = buscarPorId(clienteRequest.getId());
		atualizarDadosDeUmObejto(clienteRequest, cliente);

		cliente.setDataAtualizacao(new Date());

		return clienteRepository.save(cliente);
	}

	public void atualizarDadosDeUmObejto(Cliente clienteRequest, Cliente clienteModel) {
		clienteModel.setNomeCompleto(clienteRequest.getNomeCompleto());
		clienteModel.setCpf(clienteRequest.getCpf());
		clienteModel.setDataNascimento(clienteRequest.getDataNascimento());

		for (Endereco endereco : clienteRequest.getEnderecos()) {
			if (endereco.getCliente() == null) {
				endereco.setCliente(clienteRequest);
			}
			enderecoService.atualizar(endereco);
		}

		clienteModel.setEnderecos(clienteRequest.getEnderecos());
	}

	public List<Cliente> listarTodos() {
		return clienteRepository.findAll();
	}

	public void deletar(Integer id) {
		buscarPorId(id);

		clienteRepository.deleteById(id);
	}

	public List<Cliente> pesquisaAvancada(String parametro) {
		Optional<List<Cliente>> cliente = clienteRepository.findByName(parametro);
		
		if (cliente.isEmpty()) {
			throw new ObjectNotFoundException("Objeto não encontrado! Parâmetro: " + parametro + ", Tipo" + Cliente.class.getName());
		}
		
		return cliente.get();
	}

}
