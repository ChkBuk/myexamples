package com.example.polls.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.polls.model.Model;

public interface ModelRepository extends JpaRepository<Model, Long>{


    Optional<Model> findById(Long familyId);

    List<Model> findByIdIn(List<Long> familyIds);

    List<Model> findByIdIn(List<Long> familyIds, Sort sort);

}
