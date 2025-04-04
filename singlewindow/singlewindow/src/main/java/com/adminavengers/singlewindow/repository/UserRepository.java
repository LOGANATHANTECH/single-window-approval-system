package com.adminavengers.singlewindow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.adminavengers.singlewindow.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	List<User> findByName(String name);
	
	Optional<User> findByEmail(String email);

	
	List<User> findByRoleAndName(String role, String password);

	
//	@Query("select u from User u where u.name and u.password")
	Optional<User> findByEmailAndPassword(String email, String password);
	
	
	
}
