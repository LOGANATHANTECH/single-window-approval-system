package com.adminavengers.singlewindow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.adminavengers.singlewindow.entity.Application;
import com.adminavengers.singlewindow.entity.Status;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

	@Query("select a from Application a where status=?1")
	List<Application> findByStatus(Status status);
}
