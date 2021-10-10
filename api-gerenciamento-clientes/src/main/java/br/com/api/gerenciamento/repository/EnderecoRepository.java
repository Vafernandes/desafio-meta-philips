package br.com.api.gerenciamento.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.api.gerenciamento.model.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Integer>{

	List<Endereco> findByClienteId(Integer clienteId);

}
