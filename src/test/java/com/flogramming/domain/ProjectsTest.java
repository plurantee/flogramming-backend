package com.flogramming.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.flogramming.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProjectsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Projects.class);
        Projects projects1 = new Projects();
        projects1.setId("id1");
        Projects projects2 = new Projects();
        projects2.setId(projects1.getId());
        assertThat(projects1).isEqualTo(projects2);
        projects2.setId("id2");
        assertThat(projects1).isNotEqualTo(projects2);
        projects1.setId(null);
        assertThat(projects1).isNotEqualTo(projects2);
    }
}
