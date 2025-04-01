package com.adminavengers.singlewindow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adminavengers.singlewindow.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

}
