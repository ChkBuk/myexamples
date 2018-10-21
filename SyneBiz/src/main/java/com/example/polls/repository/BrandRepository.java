package com.example.polls.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.polls.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long>{

    Optional<Brand> findById(Long brandId);

    Page<Brand> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<Brand> findByIdIn(List<Long> brandIds);

    List<Brand> findByIdIn(List<Long> brandIds, Sort sort);
}
