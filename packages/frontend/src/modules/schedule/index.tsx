import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, LinearProgress } from '@material-ui/core';
import { Pagination } from '@mui/material';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { APP_KEYS, LIMIT } from '../common/consts';
import { IApiError, ITraineRoute } from '../common/types';
import { SPACES, FONTS } from '../theme';
import { TableComponent } from './components/table/table.component';
import { scheduleService } from './services/schedule.services';
import { ModalComponent } from '../common/components/modal/modal.component';
import { AddTrainRouteComponent } from './components/add-train-route/add-train-route.component';
import { HeaderButtonsComponent } from './components/header-buttons/header-buttons.component';

export const ScheduleContainer = () => {
  const [item, setItem] = useState<ITraineRoute | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useHistory();

  const { data, refetch, isLoading } = useQuery(
    [`${APP_KEYS.QUERY_KEYS.TRAINS}`],
    async () =>
      scheduleService.getAllTrainRoute({
        day: filterDay,
        search: searchParam,
        limit: LIMIT,
        page: currentPage
      }),
    {
      refetchOnMount: true,
      onError: (error: IApiError) => {
        toast.error(error.message);
      }
    }
  );

  const handleItemClick = (value: ITraineRoute) => {
    setItem(value);
    setIsOpen(!isOpen);
  };

  const handleModalClick = () => {
    if (item) {
      setItem(null);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filterDay !== '') {
      params.append('day', filterDay);
    } else {
      params.delete('status');
    }
    if (searchParam !== '') {
      params.append('search', searchParam);
    } else {
      params.delete('search');
    }
    params.append('page', String(currentPage));

    navigate.push({ search: params.toString() });

    refetch();
  }, [filterDay, searchParam, currentPage]);

  return (
    <Container style={{ paddingTop: SPACES.xl, paddingBottom: SPACES.xl }}>
      <Typography variant="h3" component="h1" style={{ paddingBottom: SPACES.xl }}>
        Train Scheduale
      </Typography>
      <HeaderButtonsComponent
        modalClick={handleModalClick}
        setDay={setFilterDay}
        setSearch={setSearchParam}
      />
      {isLoading ? (
        <LinearProgress />
      ) : data?.trainSchedual.length !== 0 ? (
        <>
          <TableComponent data={data!.trainSchedual} onClick={handleItemClick} />
          <Container style={{ paddingTop: SPACES.m }}>
            <Pagination
              count={data!.totalPages}
              variant="outlined"
              shape="rounded"
              onChange={(e, page) => {
                setCurrentPage(page);
              }}
            />
          </Container>
        </>
      ) : (
        <Container>
          <Typography
            style={{
              textAlign: 'center',
              fontSize: FONTS.SIZES.l,
              paddingTop: SPACES.m
            }}
          >
            Don&#39;t have trains for today!
          </Typography>
        </Container>
      )}

      {isOpen && (
        <ModalComponent handleClose={handleModalClick} open={isOpen}>
          <AddTrainRouteComponent item={item!} onClick={handleModalClick} />
        </ModalComponent>
      )}
    </Container>
  );
};
