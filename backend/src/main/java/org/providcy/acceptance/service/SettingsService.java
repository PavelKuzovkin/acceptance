package org.providcy.acceptance.service;

import lombok.RequiredArgsConstructor;
import org.providcy.acceptance.model.Settings;
import org.providcy.acceptance.repository.SettingsRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SettingsService {

    private final SettingsRepository repository;

    public Optional<Settings> findById(long id) {
        return repository.findById(id);
    }

    public Settings update(long id, Settings dto) {
        Optional<Settings> optional = repository.findById(id);
        Settings data;

        if (optional.isEmpty()) {
            data = new Settings();
            data.setId(1L);
        } else {
            data = optional.get();
        }

        data.setStopOnIncident(dto.isStopOnIncident());
        data.setCleanPercent(dto.getCleanPercent());
        data.setPartialPercent(dto.getPartialPercent());
        data.setBadPercent(dto.getBadPercent());
        data.setQuantityAlarm(dto.getQuantityAlarm());

        return repository.save(data);
    }
}
