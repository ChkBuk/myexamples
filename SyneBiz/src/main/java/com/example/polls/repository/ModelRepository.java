package com.example.polls.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.polls.model.Family;
import com.example.polls.model.Model;

public interface ModelRepository extends JpaRepository<Model, Long>{

    Optional<Model> findById(Long modelId);
    List<Model> findByIdIn(List<Long> modelIds);
    List<Model> findByIdIn(List<Long> familyIds, Sort sort);
    @Query("SELECT a FROM Model a WHERE a.id=:modelId")
    Page<Model> findByModelId(@Param("modelId") Long modelId, Pageable pageable);
    @Query("SELECT a FROM Model a WHERE a.brand.id=:brandId")
    Page<Model> findByBrandIdIn(@Param("brandId") Long brand_id, Pageable pageable);
    @Query("SELECT a FROM Model a WHERE a.family.id=:familyId")
    Page<Model> findByFamilyIdIn(@Param("familyId") Long family_id, Pageable pageable);
}
 