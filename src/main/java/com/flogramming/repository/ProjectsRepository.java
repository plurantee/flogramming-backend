package com.flogramming.repository;

import com.flogramming.domain.Projects;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Projects entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectsRepository extends MongoRepository<Projects, String> {}
