package br.com.api.gerenciamento.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.api.gerenciamento.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

	Optional<Cliente> findByCpf(String cpf);

	@Query("Select c from Cliente c where c.nomeCompleto like %:parametro% OR c.cpf like %:parametro% OR c.dataNascimento like %:parametro%")
	Optional<List<Cliente>> findByName(@Param("parametro") String parametro);

}
