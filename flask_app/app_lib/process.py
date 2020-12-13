import pandas as pd
import numpy as np
import json

class process_data:
    def __init__(self, lst):
        self.df = self.to_df(lst)
        
    def to_df(self, lst):
        tdf = pd.DataFrame(lst)
        not_a_float = ['Day', 'Month', 'Year','RA','SN','TS','FG']
        for column in tdf.columns:
            if column in not_a_float:
                tdf[column] = tdf[column].astype(np.int)
            elif column != 'City':
                tdf[column] = pd.to_numeric(tdf[column])
        return tdf

    def get_average_temp_data(self):
        temp_mean = self.df.pivot_table(index = 'Year', columns = 'City', values = 'T')
        temp_mean.rename({'St John': 'St_John'}, axis = 1, inplace = True)
        output_dict = {}
        for col in temp_mean.columns:
            output_dict.update({col: list(temp_mean[col].values)})
        lbl = list(temp_mean.index)
        return json.dumps({'output_dict':output_dict, 'lbl': lbl})

    def get_weather_event_data(self):
        weather = self.df.pivot_table(aggfunc = 'sum', values = ['RA', 'SN', 'TS', 'FG'], index = 'City')
        weather.rename({'RA': 'Rainy', 'SN': 'Snowy', 'TS': 'Tornados', 'FG': 'Foggy'}, axis = 1, inplace = True)
        lbl = list(weather.index)
        output_dict = {}
        for col in weather.columns:
            output_dict.update({col: list(weather[col].values.astype('float'))})
        return json.dumps({'output_dict':output_dict, 'lbl': lbl})
        
