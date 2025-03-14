package com.adminavengers.singlewindow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.adminavengers.singlewindow.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
}
