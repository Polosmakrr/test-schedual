import React from 'react';
import { Container, Button, InputLabel, Typography } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { COLORS, SPACES } from '../../../theme';
import { IApiError, ITraineRoute } from '../../../common/types';
import { inputValidationSchema } from '../../schema/input-validation.schema';
import { InputComponent } from '../../../common/components/input/input.component';
import { scheduleService } from '../../services/schedule.services';
import { APP_KEYS } from '../../../common/consts';
import { SIZES } from '../../../theme/fonts.const';

export const AddTrainRouteComponent = ({
  item,
  onClick
}: {
  item?: ITraineRoute;
  onClick: () => void;
}) => {
  const queryClient = useQueryClient();

  const createTrainRoute = useMutation({
    mutationFn: (newTrainRoute: ITraineRoute) => scheduleService.createTrainRoute(newTrainRoute),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TRAINS]);
      toast.success('New route created!');
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });

  const updateTrainRoute = useMutation({
    mutationFn: ({ newTrainRoute, id }: { newTrainRoute: ITraineRoute; id: string }) =>
      scheduleService.updateTrainRouteById(newTrainRoute, id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TRAINS]);
      toast.success('Changing saved!');
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });

  const deleteTrainRoute = useMutation({
    mutationFn: (id: string) => scheduleService.deleteTrainRouteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TRAINS]);
      toast.success('Deleted successfully!');
    },
    onError: (error: IApiError) => {
      toast.error(error.message);
    }
  });

  return (
    <Container
      style={{
        paddingTop: SPACES.l,
        paddingBottom: SPACES.l,
        paddingLeft: SPACES.xxl,
        paddingRight: SPACES.xxl,
        backgroundColor: COLORS.white
      }}
    >
      {item ? (
        <Typography style={{ paddingBottom: SPACES.m, textAlign: 'center' }}>
          Update route
          <Typography>
            ({item.departurePoint} &#8594; {item.destination})
          </Typography>
        </Typography>
      ) : (
        <Typography style={{ paddingBottom: SPACES.m, textAlign: 'center' }}>
          Create new route
        </Typography>
      )}
      <Formik
        initialValues={{
          trainNumber: item?.trainNumber || '',
          departurePoint: item?.departurePoint || '',
          destination: item?.destination || '',
          arrivalTime: item?.arrivalTime || '',
          departureTime: item?.departureTime || '',
          day: item?.day || ''
        }}
        validationSchema={inputValidationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          if (item) {
            updateTrainRoute.mutate({ newTrainRoute: values, id: item._id! });
            onClick();
            return;
          }
          createTrainRoute.mutate(values);
          onClick();
        }}
      >
        {(formik: FormikProps<ITraineRoute>) => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <InputComponent type="text" name="trainNumber" label="Number of train" />
            <InputComponent type="text" name="departurePoint" label="Point of departure" />
            <InputComponent type="text" name="destination" label="Destination" />
            <InputLabel style={{ fontSize: SIZES.s }}>Time of arrival</InputLabel>
            <InputComponent type="time" name="arrivalTime" />
            <InputLabel style={{ fontSize: SIZES.s }}>Time of departure</InputLabel>
            <InputComponent type="time" name="departureTime" />
            <InputLabel style={{ fontSize: SIZES.s }}>Day</InputLabel>
            <InputComponent type="date" name="day" />
            <Container
              style={{
                display: 'flex',
                justifyContent: item ? 'space-between' : 'center'
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onSubmit={() => formik.handleSubmit}
              >
                Save
              </Button>

              {item && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    deleteTrainRoute.mutate(item._id!);
                    onClick();
                  }}
                >
                  delete
                </Button>
              )}
            </Container>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
