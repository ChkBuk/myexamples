package com.example.polls.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.polls.model.Family;
@Repository
@Transactional
public interface FamilyRepository extends JpaRepository<Family, Long>{

    Optional<Family> findById(Long familyId);
    Page<Family> findByCreatedBy(Long userId, Pageable pageable);
    List<Family> findByIdIn(List<Long> familyIds);
    List<Family> findByIdIn(List<Long> familyIds, Sort sort);
    @Query("SELECT a FROM Family a WHERE a.brand.id=:brandId")
    Page<Family> findByBrandIdIn(@Param("brandId") Long brand_id, Pageable pageable);
}
