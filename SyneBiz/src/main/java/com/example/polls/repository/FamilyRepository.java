package com.example.polls.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.polls.model.Family;

public interface FamilyRepository extends JpaRepository<Family, Long>{

    Optional<Family> findById(Long familyId);
    Page<Family> findByCreatedBy(Long userId, Pageable pageable);
    List<Family> findByIdIn(List<Long> familyIds);
    List<Family> findByIdIn(List<Long> familyIds, Sort sort);
}
