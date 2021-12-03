package org.providcy.acceptance.repository;

import org.providcy.acceptance.model.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepository extends JpaRepository<Settings, Long> {
}
